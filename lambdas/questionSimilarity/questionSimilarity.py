import requests
import json
import logging
import boto3
from botocore.exceptions import ClientError

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

API_URL = "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2"
headers = {"Authorization": "Bearer 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"}

def query(payload):
    try:
        response = requests.post(API_URL, headers=headers, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        logger.error(f"Request failed: {e}")
        raise

def compute_similarity(docs, others):
    try:
        output_docs = query({"inputs": {"source_sentence": "", "sentences": docs}})
        output_others = query({"inputs": {"source_sentence": "", "sentences": others}})
        
        origin_embedding = output_docs['outputs']
        other_embedding = output_others['outputs']
        
        sim = util.pytorch_cos_sim(origin_embedding, other_embedding).tolist()
        return sim
    except Exception as e:
        logger.error(f"Failed to compute similarity: {e}")
        raise

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        docs = body['docs']
        others = body['others']
        
        similarity_scores = compute_similarity(docs, others)
        
        return {
            'statusCode': 200,
            'body': json.dumps({'similarity_scores': similarity_scores})
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
