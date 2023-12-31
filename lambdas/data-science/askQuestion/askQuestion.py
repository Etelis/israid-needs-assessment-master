import numpy as np
import json
import logging
import requests
import boto3
from botocore.exceptions import ClientError
import os

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)
THRESHOLD = 0.65
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
    """
    Initiate question answering based on a document list

    :param question: a string question to be answered
    :param context: an object containing texts from every doc in doc list alongside their name

    :returns: Answer to the question alongside reliability measures
    """
    # gpu = 1 if torch.cuda.is_available() else 0
    texts = context['context']
    names = context['names']
    try:
        # Approach 1: if file name/start-end chars are necessary too, need to check each doc individually
        outputs = [query({
            "inputs": {
                "question": question,
                "context": text
            },
        }) for text in texts]
        best_response_idx = np.argmax([resp['score'] for resp in outputs])
        best_response = outputs[best_response_idx]
        conf = best_response['score']
        if conf >= THRESHOLD:
            result = {'answer': best_response['answer'],
                      'source': (best_response['start'], best_response['end']),
                      'filename': names[best_response_idx]}
        else:
            result = {'answer': [],
                      'source': (),
                      'filename': ''}
        # answer = f"{best_response['answer']} | Confidence: {round(best_response['score'], 4)} | Start-end Characters: {best_response['start'], best_response['end']} | Original File: {names[best_response_idx]}"
        return result
    except Exception as e:
        logger.error(f"Failed to answer question: {e}")
        raise


# texts_joined = ''.join(texts)
# question_answerer = pipeline("question-answering", model='distilbert-base-uncased-distilled-squad')
# best_response = question_answerer(question=question, context=texts_joined)


def lambda_handler(event, context):
    try:
        context = json.loads(event['context']['body'])['answer']

        # event = json.loads(event['body'])
        question = event['question']
        # context = event['context']

        answer = answer_question(question, context)

        return {
            'statusCode': 200,
            'body': json.dumps({'answer': answer}),
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


# Expected input format #####
# from getContext import getContext
#
# eventcontext = {
#     "context": [
#         "C:\\Users\\idoli\\OneDrive\\PycharmProjects\\empathPOC\\sample-docs\\Bertpaper.pdf",
#         "C:\\Users\\idoli\\OneDrive\\PycharmProjects\\empathPOC\\sample-docs\\doctest.docx"
#     ]
# }
# context = getContext.lambda_handler(eventcontext, {})
# event = {
#     "question": "which harta barta?",
#     "context": context
# }
# lambda_handler(event, {})
