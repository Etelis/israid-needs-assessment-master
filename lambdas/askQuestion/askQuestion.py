import json
import logging
import requests
import boto3
from botocore.exceptions import ClientError

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

API_URL = "https://api-inference.huggingface.co/models/distilbert-base-uncased-distilled-squad"
headers = {"Authorization": "Bearer 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"}

def query(payload):
    try:
        response = requests.post(API_URL, headers=headers, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        logger.error(f"Request failed: {e}")
        raise

def answer_question(question, context):
    try:
        output = query({
            "inputs": {
                "question": question,
                "context": context
            },
        })
        answer = f"{output['answer']} | Reliability: {round(output['score'], 4)}"
        return answer
    except Exception as e:
        logger.error(f"Failed to answer question: {e}")
        raise

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        question = body['question']
        context = body['context']
        
        answer = answer_question(question, context)
        
        return {
            'statusCode': 200,
            'body': json.dumps({'answer': answer})
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
