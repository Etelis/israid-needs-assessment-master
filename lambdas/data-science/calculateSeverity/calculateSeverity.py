import json
import logging
import requests
import boto3
from botocore.exceptions import ClientError
from scipy.special import softmax

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

API_URL = "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest"
headers = {"Authorization": "Bearer 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"}

def query(payload):
    try:
        response = requests.post(API_URL, headers=headers, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        logger.error(f"Request failed: {e}")
        raise

def analyze_sentiment(text):
    try:
        output = query({"inputs": text})
        scores = output['scores'] 
        neg_score, neu_score, pos_score = softmax(scores)
        return neg_score
    except Exception as e:
        logger.error(f"Failed to analyze sentiment: {e}")
        raise

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        text = body['answer']['otherText']
        
        neg_score = analyze_sentiment(text)
        
        return {
            'statusCode': 200,
            'body': json.dumps({'negative_score': str(neg_score)})
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
