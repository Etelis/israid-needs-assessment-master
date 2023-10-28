import requests
import json
import logging
import boto3
from botocore.exceptions import ClientError
import os

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

THRESHOLD = 0.7
API_URL = "https://api-inference.huggingface.co/models/sentence-transformers/all-mpnet-base-v2"
headers = {"Authorization": "Bearer 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"}


def query(payload):
    try:
        payload["wait_for_model"] = True
        response = requests.post(API_URL, headers=headers, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        logger.error(f"Request failed: {e}")
        raise


def compute_similarity(new_question, question_list):
    """
    Compute similarity between each sentence in docs list and others list
    Using model: https://huggingface.co/sentence-transformers/all-mpnet-base-v2'

      :param new_question:
    A new question about to be submitted

    :param question_list:
    A list of previous, existing questions

    Returns: list of historic questions similar enough (meeting or exceeding similarity threshold) to the new question.
    """
    try:
        similarities = query({"inputs": {"source_sentence": new_question, "sentences": question_list}})
        relevant_indices = [i for i in range(len(similarities)) if similarities[i] >= THRESHOLD]
        rel_len = len(relevant_indices)
        # text = f"This Question is similar to {str(rel_len)} question{'s' if rel_len > 1 else ''}: \n" + '\n'.join(
        #     question_list) if rel_len > 0 else 'No similar questions found'
        if rel_len:
            result = {'similarQuestions': [question_list[i] for i in relevant_indices]}
        else:
            result = {'similarQuestions': []}
        #print(text)
        return result
    except Exception as e:
        logger.error(f"Failed to compute similarity: {e}")
        raise

def lambda_handler(event, context):
    try:
        event = json.loads(event['body'])
        new_question = event['source sentence']
        prev_quesitons = event['sentences']

        similarQuestions = compute_similarity(new_question, prev_quesitons)

        return {
            'statusCode': 200,
            'body': json.dumps({'similarQuestions': similarQuestions}),
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


# Expected Input Format ######
# event = {
#     "source sentence":
#         "How can I be a good geologist?",
#     "sentences": [
#         "What is the step by step guide to invest in share market in india?",
#         "What is the step by step guide to invest in share market in india?",
#         "What is the story of Kohinoor (Koh-i-Noor) Diamond?"
#     ]
# }
# lambda_handler(event, {})
