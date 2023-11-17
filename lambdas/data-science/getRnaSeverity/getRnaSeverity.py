import json
import logging
import boto3 
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key, Attr
from textblob import TextBlob
import math
import os

## Change this global settings if necessary
REGION = 'eu-north-1'
ANSWERS_TABLE_NAME = 'Answers'
RNAS_TABLE_NAME = 'Rnas'
RNA_TABLE_KEY = 'rnaId'

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
    total_grade = 0.0  # stays 0 if answer is False
    if type(answer['value']) == str:
        total_grade = severity(answer['value'])

    if type(answer['value']) == bool and (answer['value'] == True):
        total_grade = 1
        if answer['notes'] != None:
            print(answer['notes'])
            total_grade = severity(answer['notes'])
    
    return total_grade

def normalize(severity_dict):
    max_value = max(severity_dict.values())
    for item in severity_dict:
        severity_dict[item] = math.ceil((severity_dict[item]/max_value)*100)
    return severity_dict

def get_severity(data) -> dict:
    severity_dict = {}
    for rna_key in data:
        rna_score = 0.0
        for ans_key in data[rna_key]:
            rna_score += calaculate_answer(data[rna_key][ans_key])
        print(rna_score)
        severity_dict[rna_key] = rna_score/len(data[rna_key])

    severity_dict = normalize(severity_dict)

    return severity_dict

def get_answers(items: list) -> dict:

    # connect to an existing dynamodb
    dynamodb=boto3.resource('dynamodb',region_name=REGION)
    
    # connect to dynamodb tables
    rnas_table = dynamodb.Table(RNAS_TABLE_NAME) # decide between rnas, categories, subcategories
    answers_table = dynamodb.Table(ANSWERS_TABLE_NAME)  # depends on the Answers Table name 
    
    if items == ['*']: # take all
        print(f'Getting all items from table: {RNAS_TABLE_NAME}')
        response = rnas_table.scan()
        response_data = response['Items']

        # Since scan can only retrieve 1MB of data at a time, we need to paginate to retrieve all data
        while 'LastEvaluatedKey' in response:
            response = rnas_table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
            response_data.extend(response['Items'])
        
        items = []
        for resp in response_data:
            items.append(resp['id'])
 
    print(f'Found {len(items)} items:\n{items}')
     
    data = {}
    for rna_id in items:
        print(f'[-] Fetching answers from {rna_id}')
        response = answers_table.scan(FilterExpression=Attr(RNA_TABLE_KEY).eq(rna_id)) #get list of all answers of rnaId
        print(f'responses:\n{response}')
        
        answers = {}
        for ans in response['Items']:
            answers[ans['questionId']] = {
                                'value': ans['value']['storedValue'],
                                'notes': ans['notes']
                                }
        data[rna_id] = answers
        print(f'[-] {rna_id} Done')

    return data


def lambda_handler(event, context):

    try:   
        print(event)
        data = get_answers(event['RNA_items'])
        scores = get_severity(data)

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
