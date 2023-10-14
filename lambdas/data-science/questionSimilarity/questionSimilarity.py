import requests
import json
import logging
import boto3
from botocore.exceptions import ClientError
from sentence_transformers import util

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

THRESHOLD = 0.7
API_URL = "https://api-inference.huggingface.co/models/sentence-transformers/all-mpnet-base-v2"
headers = {"Authorization": "Bearer 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"}


def query(payload):
    try:
        response = requests.post(API_URL, headers=headers, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        logger.error(f"Request failed: {e}")
        raise


def compute_similarity(question_list, new_question):
    """
    Compute similarity between each sentence in docs list and others list
    Using model: https://huggingface.co/sentence-transformers/all-mpnet-base-v2'

    :param question_list:
    A list of previous, existing questions

    :param new_question:
    A new question about to be submitted

    Returns: list of historic questions similar enough (meeting or exceeding similarity threshold) to the new question.
    """
    try:
        output_docs = query({"inputs": {"source_sentence": "", "sentences": question_list}})
        output_others = query({"inputs": {"source_sentence": "", "sentences": new_question}})

        historic_emb = output_docs['outputs']
        new_emb = output_others['outputs']

        similarities = util.pytorch_cos_sim(new_emb, historic_emb)
        similarities = similarities.squeeze()
        # print(similarities.shape)
        relevant_indices = [i for i in range(len(similarities)) if similarities[i] >= THRESHOLD]
        rel_len = len(relevant_indices)
        result = f"This Question is similar to {rel_len} question{'s' if rel_len > 1 else ''}: \n" + question_list[
            relevant_indices].to_string(index=False) if rel_len > 0 else ''
        return result
    except Exception as e:
        logger.error(f"Failed to compute similarity: {e}")
        raise


def lambda_handler(event, context):
    try:
        docs = event['docs']
        others = event['others']

        similarity_scores = compute_similarity(docs, others)

        return {
            'statusCode': 200,
            'body': {'similarity_scores': similarity_scores}
        }
    except ClientError as e:
        logger.error(f"Client error: {e}")
        return {
            'statusCode': 500,
            'body': {'Internal server error'}
        }
    except Exception as e:
        logger.error(f"Error: {e}")
        return {
            'statusCode': 500,
            'body': {'Internal server error'}
        }