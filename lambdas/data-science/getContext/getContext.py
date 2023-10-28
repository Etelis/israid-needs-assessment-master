import docx
import PyPDF2
import json
import logging
import boto3
from botocore.exceptions import ClientError
import os

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)


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
    docs_contents = [preprocess_doc(doc_path) for doc_path in docs_paths]
    return docs_contents, docs_paths


def process_context(context):
    """
    Preprocess documents for question-answering purposes

    :param context: a list of PATHS to .docx/.txt/.pdf documents

    :returns: Test from each doc alongside their name for reliability measures.
    """
    # gpu = 1 if torch.cuda.is_available() else 0
    try:
        contents, paths = preprocess_docs(context)
        result = {'context': contents, 'names': paths}
        return result
    except Exception as e:
        logger.error(f"Failed to process text")
        raise


def lambda_handler(event, context):
    try:
        event = json.loads(event['body'])
        context = event['context']

        contents = process_context(context)

        return {
            'statusCode': 200,
            'body': json.dumps({'answer': contents}),
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
#   "context": [
#     "Bertpaper.pdf",
#     "doctest.docx"
#   ]
# }
# wee = lambda_handler(event, {})
