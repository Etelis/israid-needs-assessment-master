import json
import logging
from botocore.exceptions import ClientError
from textblob import TextBlob
import math
import os, sys

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

example_event_allrna = {
    'fb91fdc7-46ba-47f8-bc3c-d1e480ad71be': {   # first RNA ID - can be the ONLY ONE
        '550e8400-e29b-41d4-a716-446655440000': {
            'value': 'No',
            'notes': 'There are no routes to the schools because some cars are blocking the way'
        },
        '550e8400-e29b-41d4-a716-446655440001': {
            'value': 'The elder leader says the community never used toilets and do not know the concept of sanitation',
            'notes': ''
        },
        '550e8400-e29b-41d4-a716-446655440002': {
            'value': 'Yes',
            'notes': ''
        }
    },
    'fb91fdc7-46ba-47f8-bc3c-d1e480ad71bf': {   # second RNA ID - this wont exist incase of 1 RNA
        'c7013a49-a854-4266-aa12-8de91f22ca31': {
            'value': 'Yes',
            'notes': ''
        },
        'c7013a49-a854-4266-aa12-8de91f22ca32': {
            'value': 'There are several other groups in the area like: NGA, VTYA, and the local government',
            'notes': ''
        },
        'c7013a49-a854-4266-aa12-8de91f22ca33': {
            'value': 'Yes',
            'notes': ''
        }
    }
}

def severity(text):
    """
    Calculate severity metric on some text segment

    :param text: text to gauge severity on
    :returns: Severity score: 0.8*[normalized polarity] + 0.2*[1-subjectivity]
    """
    testimonial = TextBlob(text)
    sentiment = testimonial.sentiment
    # Normalize Polarity and weigh in objectivity to create a 0-1 scale measure
    # Higher score = a more severe, objective report
    sev = 0.8 * ((-1 * sentiment.polarity - (-1)) / 2) + 0.2 * (1 - sentiment.subjectivity)
    return sev

def calaculate_answer(answer):
    total_grade = 0.0
    if type(answer['value']) == bool:
        if answer['value'] == True:
            if answer['notes'] != '':
                total_grade = severity(answer['notes'])
            else:
                total_grade = 1
    if type(answer['value']) == str:
         total_grade = severity(answer['value'])
    return total_grade

def normalize(severity_dict):
    max_value = max(severity_dict.values())
    for item in severity_dict:
        severity_dict[item] = math.ceil((severity_dict[item]/max_value)*100)
    return severity_dict

def get_severity(answers):
    severity_dict = {}
    for item in answers:
        total_grade = 0.0
        for answer in answers[item]:
            total_grade += calaculate_answer(answers[item][answer])
        severity_dict[item] = total_grade/len(item)
    severity_dict = normalize(severity_dict)

    return severity_dict


def lambda_handler(event, context):
    try:
        all_answers = json.loads(event['body'])
        sev_dict = get_severity(all_answers)

        return {
            'statusCode': 200,
            'body': json.dumps({'severity': str(sev_dict)}),
            'headers': {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': os.getenv("CORS")
			}
        }
    except ClientError as e:
        logger.error(f"Client error: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error_message': 'Internal server error'}),
            'headers': {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': os.getenv("CORS")
			}
        }
    except Exception as e:
        logger.error(f"Error: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error_message': 'Internal server error'}),
            'headers': {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': os.getenv("CORS")
			}
        }


# print(get_severity(example_event_allrna))

