import docx
import PyPDF2
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


def docx_to_text(uploaded_doc_path):
    doc = docx.Document(uploaded_doc_path)
    return ''.join([p.text for p in doc.paragraphs]).replace('\n', ' ')


def txt_to_text(uploaded_txt_path):
    with open(uploaded_txt_path, 'r') as file:
        data = file.read().replace('\n', ' ')
    return data


def pdf_to_text(uploaded_pdf_path):
    pdffileobj = open(uploaded_pdf_path, 'rb')
    pdfreader = PyPDF2.PdfReader(pdffileobj)
    output = [page.extract_text() for page in pdfreader.pages]
    return ''.join(output).replace('\n', ' ')


def preprocess_doc(uploaded_doc_path):
    file_type = uploaded_doc_path.split('.')[-1]
    if file_type.lower() == 'txt':
        return txt_to_text(uploaded_doc_path)
    if file_type.lower() == 'docx' or file_type.lower() == 'doc':
        return docx_to_text(uploaded_doc_path)
    if file_type.lower() == 'pdf':
        return pdf_to_text(uploaded_doc_path)
    else:
        raise ValueError('File type is not supported')


def preprocess_docs(docs_paths):
    docs_contents = [(preprocess_doc(doc_path), doc_path) for doc_path in docs_paths]
    return docs_contents


def query(payload):
    try:
        response = requests.post(API_URL, headers=headers, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        logger.error(f"Request failed: {e}")
        raise


def answer_question(question, docs):
    """
    Initiate question answering based on a document list

    :param question: a string question to be answered
    :param docs: a list of PATHS to .docx/.txt/.pdf documents

    :returns: Answer to the question alongside reliability measures
    """
    # gpu = 1 if torch.cuda.is_available() else 0
    contents = preprocess_docs(docs)
    texts = [content[0] for content in contents]
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
        answer = f"{best_response['answer']} | Confidence: {round(best_response['score'], 4)} | Start-end Characters: {best_response['start'], best_response['end']} | Original File: {contents[best_response_idx][1]}"
        return answer
    except Exception as e:
        logger.error(f"Failed to answer question: {e}")
        raise

    # texts_joined = ''.join(texts)
    # question_answerer = pipeline("question-answering", model='distilbert-base-uncased-distilled-squad')
    # best_response = question_answerer(question=question, context=texts_joined)


def lambda_handler(event, context):
    try:
        question = event['question']
        context = event['context']

        answer = answer_question(question, context)

        return {
            'statusCode': 200,
            'body': {'answer': answer}
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







