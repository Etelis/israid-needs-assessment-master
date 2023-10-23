import json
import logging
import boto3
from botocore.exceptions import ClientError
from textblob import TextBlob
import math

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)


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
        for answer in item:
            total_grade += calaculate_answer(answer)
        severity_dict[item] = total_grade/len(item)
    severity_dict = normalize(severity_dict)
    return severity_dict



def lambda_handler(event, context):
    try:
        all_answers = json.loads(event['body']) # list of dicts like example above

        sev_dict = get_severity(all_answers)   # UPDATE THIS FUNCTION TO RETURN A DICT OF ['id','severity']

        return {
            'statusCode': 200,
            'body': json.dumps({'severity': str(sev_dict)})
        }
    except ClientError as e:
        logger.error(f"Client error: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error_message': 'Internal server error'})
        }
    except Exception as e:
        logger.error(f"Error: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error_message': 'Internal server error'})
        }


# Expected Input Format ######
#event = { 
#           'answer.id': {
#                     'value': answer.value,
#                     'notes': answer.notes
#                     }, 
#           'answer.id': {
#                     'value': answer.value,
#                     'notes': answer.notes
#                     }
#       }
#lambda_handler(event, {})
