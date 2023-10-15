import logging
from botocore.exceptions import ClientError
from textblob import TextBlob

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
    sev = 0.8 * (-1 * sentiment.polarity - (-1) / (1 - (-1))) + 0.2 * (1 - sentiment.subjectivity)
    return sev


def lambda_handler(event, context):
    try:
        text = event['answer']['otherText']

        sev = severity(text)

        return {
            'statusCode': 200,
            'body': {'negative_score': str(sev)}
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
