import json
import logging
import boto3
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
        # event = json.loads(event['body'])
        text = event['text']

        sev = severity(text)

        return {
            'statusCode': 200,
            'body': json.dumps({'negative_score': str(sev)})
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


# Expected Input Format ######
# event = {
#     "text": "Reporting from the heart of Canada, I stand amidst the aftermath of a devastating earthquake that \
# has sent shockwaves through the nation. The scene before me is one of chaos and destruction, a stark reminder of \
# the unforgiving power of nature. Buildings once standing tall now lie in ruins, their structural integrity compromised \
# by the violent tremors. Streets are cracked, and debris is strewn across the landscape, painting a grim picture of the \
# widespread havoc wreaked by this seismic event. The local population's resilience is evident as they sift through the rubble, \
# searching for survivors and tending to the injured. Emergency responders work tirelessly, battling against the odds to \
# provide aid and relief to those affected by this catastrophe. As the dust settles, the magnitude of the situation becomes \
# all too clear – this earthquake has left a deep scar on the Canadian landscape, testing the resolve of its people as they \
# unite in the face of adversity."
# }
# lambda_handler(event, {})
