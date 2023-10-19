import numpy as np
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
        answer = f"{best_response['answer']} | Confidence: {round(best_response['score'], 4)} | Start-end Characters: {best_response['start'], best_response['end']} | Original File: {names[best_response_idx]}"
        return answer
    except Exception as e:
        logger.error(f"Failed to answer question: {e}")
        raise

    # texts_joined = ''.join(texts)
    # question_answerer = pipeline("question-answering", model='distilbert-base-uncased-distilled-squad')
    # best_response = question_answerer(question=question, context=texts_joined)


def lambda_handler(event, context):
    try:
        #event = json.loads(event['body'])
        question = event['question']
        context = event['context']

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

# Expected input format #####
# import processContext
# eventcontext = {
#   "context": [
#     "sample-docs/Bertpaper.pdf",
#     "sample-docs/doctest.docx"
#   ]
# }
# context = json.loads(processContext.lambda_handler(eventcontext, {})['body'])['answer']
# event = {
#   "question": "which harta barta?",
#   "context": context
# }
# lambda_handler(event, {})

