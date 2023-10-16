const { Table, Entity } = require('dynamodb-toolbox');
const { DocumentClient } = require('/opt/aws-dynamo-connector/index.js');
const { v4: uuidv4 } = require('uuid');
const { DynamoDB } = require("/opt/dynamoSdkToToolbox/aws-sdk");
const { dynamoSdkToToolbox } = require("/opt/dynamoSdkToToolbox/index.ts");

const tableDefinition = {
  TableName: "Answers",
  AttributeDefinitions: [
    {
      AttributeType: "S",
      AttributeName: "id",
    }
  ],
  KeySchema: [
    {
      AttributeName: "id",
      KeyType: "HASH",
    }
  ],
  BillingMode: "PAY_PER_REQUEST"
};

await DynamoDB.createTable(tableDefinition).promise()

const AnswerTable = new Table({
    ...dynamoSdkToToolbox(tableDefinition),
    DocumentClient
})


const Answer = new Entity({
    name: 'Answer',
    table: AnswerTable,
    attributes: {
        id: { type: 'string', partitionKey: true, default: () => uuidv4() }, 
        questionId: 'string',
        rnaId: 'string', 
        value: 'map',
        photos: { type: 'list', required: false }, 
        notes: { type: 'string', required: false },
        creationDate: { type: 'string', default: () => new Date().toISOString() }
    }
});


module.exports = { Answer };