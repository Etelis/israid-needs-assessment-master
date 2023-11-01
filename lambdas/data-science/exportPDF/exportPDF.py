import json
import logging
import requests
import plotly.express as px
from fpdf import FPDF
import base64
import os
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key

## IsraAID logo
LOGO_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Logo-Israaid.svg/2560px-Logo-Israaid.svg.png'

# AWS DynamoDB configuration
REGION = 'eu-north-1' # Change this according to your AWS region
RNAS_TABLE_NAME = 'Rnas'
ANSWERS_TABLE_NAME = 'Answers'

TITLE_TEMPLATE = 'IsraAid Report'
MAIN_TITLE = 'About RNA'
SECOND_TITLE = 'Insights from the findings'
THIRD_TITLE = 'Questions & Answers'

example_JSON = [{
        "category": {
            "id": "2",
            "name": "Education",
            "description": "",
            "iconSrc": "base64"
        },
        "subcategory": {
            "id": "3",
            "name": "General",
            "categoryId": "2"
        },
        "question": {
            "id": "11",
            "category": "2",
            "subCategory": "3",
            "type": "yes-no",
            "question": "Are the schools shut down?",
            "order": "1",
            "options": [],
            "skip": ["4", "5"]
        },

        "rna": {
            "id": "6sah2013",
            "Creator": "Amit",
            "CreatorPosition": "worker",
            "CreatorPhone": "0502191911",
            "Emergency": "Earthquake",
            "AffectedHouseholds": 60,
            "communityName": "IDK",
            "communityType": "IDGAF",
            "location": "Shimshit, Israel",
            "createdOn": "19/10/2023",
            "lastUpdatedOn": "19/10/2023",
            "answered": 50,
            "isCompleted": "False",
            "severity": 60
        },
        "answer": {
            "id": "1000",
            "questionId": "11",
            "rnaId": "6sah2013",
            "value": True,
            "photos": [
                "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"],
            "notes": "amazing!!",
            "createdOn": "19/10/2023"
        }
    },
        {
            "category": {
                "id": "2",
                "name": "Education",
                "description": "no",
                "iconSrc": "base64"
            },
            "subcategory": {
                "id": "4",
                "name": "Refugees/IDPs/Migrants",
                "categoryId": "2"
            },
            "question": {
                "id": "35",
                "category": "2",
                "subCategory": "4",
                "type": "yes-no",
                "question": "Is there a need for translation?",
                "order": 2,
                "options": [],
                "skip": []
            },

            "rna": {
                "id": "6sah2013",
                "Creator": "Amit",
                "CreatorPosition": "worker",
                "CreatorPhone": "0502191911",
                "Emergency": "Earthquake",
                "AffectedHouseholds": 60,
                "communityName": "IDK",
                "communityType": "IDGAF",
                "location": "Shimshit, Israel",
                "createdOn": "19/10/2023",
                "lastUpdatedOn": "19/10/2023",
                "answered": 50,
                "isCompleted": "False",
                "severity": 60
            },
            "answer": {
                "id": "2000",
                "questionId": "35",
                "rnaId": "6sah2013",
                "value": True,
                "photos": [],
                "notes": "",
                "createdOn": "19/10/2023"
            }
        },
        {
            "category": {
                "id": "1",
                "name": "Health",
                "description": "bla",
                "iconSrc": "base64"
            },
            "subcategory": {
                "id": "17",
                "name": "Immunization",
                "categoryId": "1"
            },
            "question": {
                "id": "239",
                "category": "1",
                "subCategory": "17",
                "type": "multi-select",
                "question": "When did the last immunization occur?",
                "order": 2,
                "options": ["Within the last 6 months", "Within the last year",
                            "Within the last 2 years",
                            "Within the last 5 years"],
                "skip": []
            },

            "rna": {
                "id": "6sah2013",
                "Creator": "Amit",
                "CreatorPosition": "worker",
                "CreatorPhone": "0502191911",
                "Emergency": "Earthquake",
                "AffectedHouseholds": 60,
                "communityName": "IDK",
                "communityType": "IDGAF",
                "location": "Shimshit, Israel",
                "createdOn": "19/10/2023",
                "lastUpdatedOn": "19/10/2023",
                "answered": 50,
                "isCompleted": "False",
                "severity": 60
            },
            "answer": {
                "id": "3000",
                "questionId": "239",
                "rnaId": "6sah2013",
                "value": ["Within the last year"],
                "photos": [
                    "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"],
                "notes": "",
                "createdOn": "19/10/23"
            }
        },
        {
            "category": {
                "id": "5",
                "name": "WASH",
                "description": "descript",
                "iconSrc": "base64"
            },
            "subcategory": {
                "id": "9",
                "name": "Sanitation Excreta disposal",
                "categoryId": "5"
            },
            "question": {
                "id": "109",
                "category": "5",
                "subCategory": "9",
                "type": "yes-no",
                "question": "Are people unfamiliar with the design, construction and use of toilets?",
                "order": 1,
                "options": [],
                "skip": ["100"]
            },

            "rna": {
                "id": "6sah2013",
                "Creator": "Amit",
                "CreatorPosition": "worker",
                "CreatorPhone": "0502191911",
                "Emergency": "Earthquake",
                "AffectedHouseholds": 60,
                "communityName": "IDK",
                "communityType": "IDGAF",
                "location": "Shimshit, Israel",
                "createdOn": "19/10/2023",
                "lastUpdatedOn": "19/10/2023",
                "answered": 50,
                "isCompleted": "False",
                "severity": 60
            },
            "answer": {
                "id": "4000",
                "questionId": "109",
                "rnaId": "6sah2013",
                "value": True,
                "photos": [],
                "notes": "VERY BAD!!",
                "createdOn": "19/10/23"
            }
        },
        {
            "category": {
                "id": "5",
                "name": "WASH",
                "description": "wash is important",
                "iconSrc": "base64"
            },
            "subcategory": {
                "id": "9",
                "name": "Sanitation Excreta disposal",
                "categoryId": "5"
            },
            "question": {
                "id": "119",
                "category": "5",
                "subCategory": "9",
                "type": "yes-no",
                "question": "Are the latrines or toilets not cleaned and maintained resulting they are not hygienic and safe for all users",
                "order": 3,
                "options": [],
                "skip": []
            },

            "rna": {
                "id": "6sah2013",
                "Creator": "Amit",
                "CreatorPosition": "worker",
                "CreatorPhone": "0502191911",
                "Emergency": "Earthquake",
                "AffectedHouseholds": 60,
                "communityName": "IDK",
                "communityType": "IDGAF",
                "location": "Shimshit, Israel",
                "createdOn": "19/10/2023",
                "lastUpdatedOn": "19/10/2023",
                "answered": 50,
                "isCompleted": "False",
                "severity": 60
            },
            "answer": {
                "id": "5000",
                "questionId": "119",
                "rnaId": "6sah2013",
                "value": True,
                "photos": [],
                "notes": "",
                "createdOn": "19/10/2023"
            }
        }]

# get the logo from the www and convert it to base64
def get_as_base64(url):

    img = base64.b64encode(requests.get(url).content)
    # return img.decode('utf-8') # if we want to return a string
    return img

#convert the base64 string of the logo to png, in order to not keep the photo on the server
def convert_logo():
    with open(r"logo_image.png", "wb") as decodeit:
        decodeit.write(base64.b64decode(get_as_base64(LOGO_URL)))

class PDF(FPDF):
    def header(self):
        # logo
        convert_logo()
        self.image(r"logo_image.png", 10, 8, 50)
        # font
        self.set_font('helvetica', 'B', 20)
        # calculate width of title and position
        title_w = self.get_string_width(TITLE_TEMPLATE) + 6
        doc_w = self.w
        self.set_x((doc_w - title_w) / 2)
        # colors of the text, background and and text
        self.set_draw_color(0, 80, 180)  # border = blue
        self.set_text_color(220, 50, 50)  # text = red
        # Thickness of the frame(boarder)
        self.set_line_width(1)
        # title
        self.cell(title_w, 10, TITLE_TEMPLATE, border=False, ln=1, align='L')
        # line break
        self.ln()

    def set_title(self, title):
        self.set_font('helvetica', 'B', 20)
        # colors of the text, background and and text
        self.set_draw_color(0, 80, 180)  # border = blue
        # Thickness of the frame(boarder)
        self.set_line_width(1)
        # title
        self.cell(0, 10, title, border=False, align='L')
        # line break
        self.ln()

    # page footer
    def footer(self):
        # set position of the footer
        self.set_y(-15)
        # set font
        self.set_font('helvetica', 'I', 10)
        # set font color to grey
        self.set_text_color(169, 169, 169)
        # page number
        self.cell(0, 10, f'Page {self.page_no()}/{{nb}}', align='C')

    # adding chapter title to start of each chapter
    def chapter_title(self, chap_title):
        self.set_font('helvetica', '', 12)
        # background color
        self.set_fill_color(200, 220, 255)
        # in order to show the title
        self.cell(0, 5, chap_title, ln=1, fill=1)
        # line break
        self.ln()

    # chapter content
    def chapter_body(self, file_name):
        # read text file as binary
        with open(file_name, 'rb') as fh:
            txt = fh.read().decode('latin-1')
        # set the font
        self.set_font('times', '', 12)
        # insert text to pdf document- we want the entire weidth of the file
        # so it's set to 0
        self.multi_cell(0, 5, txt)
        # line break
        self.ln()

    def print_chapter(self, chap_title, file_name):
        # self.add_page()
        self.chapter_title(chap_title)
        self.chapter_body(file_name)

    def general_details(self, rna_details):
        last_date = rna_details['lastUpdatedOn']
        creation_date = rna_details['createdOn']
        location = rna_details['location']
        self.set_font('helvetica', '', 10)
        # background color
        self.set_fill_color(200, 220, 255)
        self.cell(80, 5, f'Last Sync Date : {last_date}', ln=1, fill=1)
        self.cell(80, 5, f'Creation Date : {creation_date}', ln=1, fill=1)
        self.cell(80, 5, f'Location : {location}', ln=1, fill=1)
        # line break
        self.ln()

#creates list with all category names in the db
def generate_cat_list(json):
    cat_list = []
    for category in json['categories']:
        if category['category.name'] not in cat_list:
            cat_list.append(category['category.name'])
    return cat_list

#creates dictionary with subcategory id as key and subcategory name as value
def subcats_names(json):
    subcats_names = {}
    for subcategory in json['subcategories']:
        subcats_names[subcategory['subcategory.id']] = subcategory['subcategory.name']
    return subcats_names

#creates dictionary with category id as key and category name as value
def categories_names(json):
    cats_names = {}
    for category in json['categories']:
        subcats_names[category['category.id']] = category['category.name']
    return cats_names

#create dictionary with category (the whole dictionary) as key and list of the subcategories (the whole dictionary) as values
def generate_sub_cats(json):
    subcats_dict = {}
    for category in json['categories']:
        subcats_dict[category['category.id']] = []
    for subcategory in json['subcategories']:
        subcats_dict[subcategory['subcategory.categoryId']].append(subcategory)
    return subcats_dict

#create dictionary with categoryid as key and list of subcategories id as values
def generate_subcats_ids(json):
    subcats_to_cats = {}
    for subcategory in json['subcategories']:
        if subcategory['subcategory.categoryId'] not in subcats_to_cats:
            subcats_to_cats[subcategory['subcategory.categoryId']] = [subcategory['subcategory.id']]
        else:
            subcats_to_cats[subcategory['subcategory.categoryId']].append([subcategory['subcategory.id']])
    return subcats_to_cats

#creates dictionary with subcategory id as key and list of its questions id as value
def generate_subcats_questions(json):
    subcats_questions = {}
    for subcategory in json['subcategories']:
        subcats_questions[subcategory['subcategory.categoryId']] = []
    for question in json['rna_questions']:
        subcats_questions[question['question.subCategory']].append(question['question.id'])
    return subcats_questions

#returns a dictionary with the details on a specific question based on its id
def find_question(json, questionid):
    for question in json['rna_questions']:
        if question['question.id'] == questionid:
            return question
    return None

#generate the text file for the Questions&Answers page
def generate_txt(json):
    sub_cats_dict = generate_sub_cats(json)
    subcats_questions = generate_subcats_questions(json)
    for category in json['categories']:
        with open(f"{category['category.name']}.txt", 'w') as f:
            for subcat in sub_cats_dict[category['category.id']]:
                f.write(f"\n{subcat['subcategory.name']}-\n")
                for answer in json['rna_answers']:
                    if answer['answer.questionId'] in subcats_questions:
                        question = find_question(json, answer['answer.questionId'])
                        question_title = question['question.question']
                        if type(answer['answer.value']) == list:
                            answer_string = ''
                            for choice in answer['answer.value']:
                                if choice != answer['answer.value'][-1]:
                                    answer_string += f'{choice}, '
                                else:
                                    answer_string += f'{choice}\n'
                            f.write(
                                f"{answer['answer.questionId']}) {question_title} - {answer_string}")
                        else:
                            f.write(
                                f"{answer['answer.questionId']}) {question_title} - {str(answer['answer.value'])}")
                
        with open(f'{category}_images.txt', 'w') as file:
            for answer in json['rna_answers']:
                question = find_question(json, answer['answer.questionId'])
                if question['question.category'] == category['category.id']:
                    images_string = ''
                    if answer['answer.photos'] is None:
                        continue
                    else:
                        for photo in answer['answer.photos']:
                            images_string += f'{photo}\n'
                    file.write(images_string)

#finds the worst subcategories in the emergency, uses getSeverity
def find_worst_subcat(answers: list):
    subcat_severity = '''call for get severity, paramter = subcategory'''
    max_subcats = [key for key, value in subcat_severity.items() if value == max(subcat_severity.values())]
    categories_to_subcats = generate_subcats_ids(json)
    subcat_names = subcats_names(json)
    cats_names = categories_names(json)
    max_string = ''
    for subcat in max_subcats:
        for categoryid in categories_to_subcats:
            if subcat in categoryid:
                category_id = json['subcategories'][subcat]['categoryID']
                break
        subcategory_name = subcat_names[subcat]
        category_name = cats_names[category_id]
        if subcat == max_subcats[-1]:
            max_string += f"{subcategory_name} in the {category_name}."
        else:
            max_string += f"{subcategory_name} in the {category_name}, "
    return max_string

#creates the image of the priorities based on the severity of the categories, uses getSeverity
def plot_categories_priorities():
    categories_severity = '''call for get severity, parameter = categories'''
    for cat in list(categories_severity.keys()):
        if categories_severity[cat] == 0:
            del categories_severity[cat]
    sorted_dict = dict(
            sorted(categories_severity.items(), key=lambda item: item[1], reverse=True))
    x_value = list(sorted_dict.values())
    y_value = sorted_dict.keys()
    fig = px.funnel(x=x_value, y=y_value, template='simple_white',
                    title="Categories Priorities", width=600, height=400,
                    labels={'x': '', 'y': ''})
    fig.write_image('categories.png')

#finds the severity of the RNA, uses getSeverity
def find_rna_severity(json):

    rna_severity = '''call for get severity, paramter = rna'''
    severity_index = rna_severity[json['rna']['id']]
    severity_txt = f"The severity index of {json['rna']['Emergency']} is {severity_index}."
    return severity_txt

def get_answers(rna_id) -> list:

    # connect to an existing dynamodb
    dynamodb=boto3.resource('dynamodb',region_name=REGION)
    
    # connect to dynamodb Answers table
    table = dynamodb.Table(ANSWERS_TABLE_NAME)  # depends on the Answers Table name 
    
    responses = table.query(KeyConditionExpression=Key('rnaID').eq(rna_id)) #get list of all answers of rnaId
    print(f'Found {len(responses)} answers')

    return responses

#creates the pdf file
def create_PDF_File(rna_details):
    pdf = PDF("P", "mm", "A4")

    # get total page numbers
    pdf.alias_nb_pages()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.general_details(rna_details)
    pdf.set_title(SECOND_TITLE)
    
    # get all answers for the RNA
    answers = get_answers(rna_details['id'])
    
    # EYAL STOPPED HERE
    worst_subcat = find_worst_subcat(answers) # SEND ALL ANSWERS OF RNA
    rna_index = find_rna_severity(json)
    rna_txt = f'\n {rna_index} \n'
    plot_categories_priorities()

    with open('insights.txt', 'w') as insights_file:
        insights_file.write(worst_subcat)
        insights_file.write(rna_txt)
        if json['rna']['isCompleted'] is False:
            insights_file.write('Please note that the Questionnaire is not completed!')

    pdf.print_chapter('insights', 'insights.txt')
    pdf.image("categories.png", 30, 110, 160, 100)

    pdf.add_page()
    pdf.set_title(THIRD_TITLE)
    generate_txt(json)
    categories = generate_cat_list(json)
    photo_y_location = 160
    photo_x_location = 0
    cat_index = 0
    i = 0
    for category in categories:
        cat_index +=1
        pdf.print_chapter(category, f'{category}.txt')
        with open (f'{category}_images.txt', 'r') as links_file:
            for photo_string in links_file.readlines():
                if len(photo_string) > 5:
                    with open(f"imageToSave{i}.png", "wb") as decodeit:
                        decodeit.write(base64.b64decode((photo_string)))
                        if photo_x_location + 60 > 210:
                            photo_y_location + 60
                            photo_x_location
                            pdf.image(f"imageToSave{i}.png", photo_x_location,
                                      photo_y_location, 50, 50)
                        else:
                            pdf.image(f"imageToSave{i}.png", photo_x_location,
                                      photo_y_location, 50, 50)
                            photo_x_location += 10
                    i += 1
        # to not add another page at the end
        if cat_index < len(categories):
            pdf.add_page()

    save_path = os.path.join(os.getcwd(),'reportPDF.pdf')
    pdf.output(save_path)
    return save_path

# Get all information about the RNA
def get_rna_details(rna_id):

    # connect to an existing dynamodb
    dynamodb=boto3.resource('dynamodb',region_name=REGION)
    
    # connect to dynamodb tables
    table = dynamodb.Table(RNAS_TABLE_NAME)
    responses = table.query(KeyConditionExpression=Key('id').eq(rna_id))
    print(responses)

    return responses[0]

def lambda_handler(event, context):
    try:
        payload = json.loads(event['body'])
        
        pdf_file_path = create_PDF_File(payload)   # UPDATE THIS FUNCTION TO RETURN A PATH TO THE PDF FILE
        # THE RETURNED PATH SHOULD BE: os.path.join(os.getcwd(),'filename.pdf')

        return {
            'statusCode': 200,
            'body': json.dumps({'severity': str(sev_dict)})
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

payload = {
        'rna': 
            {
            'id': 'fb91fdc7-46ba-47f8-bc3c-d1e480ad71be'
            },
}

rna_details = get_rna_details(payload)
pdf_file_path = create_PDF_File(rna_details)

# Expected Input Format ######
# event = 
# {
# 'rna.id':
#     {
#     "Creator",
#     "CreatorPosition",
#     "CreatorPhone",
#     "Emergency",
#     "AffectedHouseholds",
#     "communityName",
#     "communityType",
#     "location",
#     "createdOn",
#     "lastUpdatedOn",
#     "isCompleted"
#     },
# 'rna_questions': 
#     [
#       {'question.id':
#           "question.category",
#           "question.subCategory",
#           "question.question",
#           "question.order",
#           "question.options"
#        },
#  ...],
# 'rna_answers': 
#     [
#       {'answer.id':
#             "answer.questionId",
#             "answer.value",
#             "answer.photos",
#             "answer.notes"
#        },
#  ...],
# 'categories': 
#    [
#       {'category.id':
#             "category.name"
#       },
#  ...],
# "subcategories": {
#   [
#       {"subcategory.id":
#             "subcategory.name",
#             "subcategory.categoryId"
#        },
#  ...]
# }
#lambda_handler(event, {})
