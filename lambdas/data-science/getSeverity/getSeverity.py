import json
import logging
import boto3 
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key
from textblob import TextBlob
import math
import os

REGION = 'eu-north-1' # Change this according to your AWS region
ANSWERS_TABLE_NAME = 'Answers'
RNAS_TABLE_NAME = 'Rnas'

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

def get_severity(answers) -> dict:
    severity_dict = {}
    for item in answers:
        total_grade = 0.0
        for answer in answers[item]:
            total_grade += calaculate_answer(answers[item][answer])
        severity_dict[item] = total_grade/len(item)
    severity_dict = normalize(severity_dict)

    return severity_dict

def get_answers(table: str, items: list) -> dict:

    # connect to an existing dynamodb
    dynamodb=boto3.resource('dynamodb',region_name=REGION)
    
    # connect to dynamodb tables
    temp_table = dynamodb.Table(table) # decide between rnas, categories, subcategories
    answers_table = dynamodb.Table(ANSWERS_TABLE_NAME)  # depends on the Answers Table name 
    
    if items == ['*']: # take all
        response = temp_table.scan()
        response_data = response['Items']

        # Since scan can only retrieve 1MB of data at a time, we need to paginate to retrieve all data
        while 'LastEvaluatedKey' in response:
            response = temp_table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
            response_data.extend(response['Items'])
    
    else:
        data = {}
        for rna_id in items:
            response = answers_table.query(KeyConditionExpression=Key('rnaId').eq(rna_id))
            data[rna_id].append(
                                {response['id']: 
                                    {
                                        'value': response['value'], 
                                        'notes' : response['notes']
                                    }
                                })
            for item in response['Item']:
                pass

    print(type(response_data), len(response_data))
    print(response_data)
        
    return 

    # except ClientError as e:
    #         print(e.response['No item found'])
    # else:
    #         return response['Item']

def lambda_handler(event, context):

    try:
        
        table = event['table_name']
        items = event['items_id']
        print(table)
        print(items)
        
        answers = get_answers(table, items)
        return
        scores = get_severity(answers)

        return {
            'statusCode': 200,
            'body': json.dumps(scores),
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
