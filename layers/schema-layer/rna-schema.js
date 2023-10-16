const { Table, Entity } = require('dynamodb-toolbox');
const { DocumentClient } = require('/opt/aws-dynamo-connector/index.js');
const { v4: uuidv4 } = require('uuid');
const AWS = require("aws-sdk");
const { dynamoSdkToToolbox } = require("/opt/dynamoSdkToToolbox/index.js");

const DynamoDB = new AWS.DynamoDB();
const tableDefinition = {
    TableName: "Rnas",
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

const createTable = async () => {
    try {
      await DynamoDB.createTable(tableDefinition).promise();
      console.log("Table created successfully.");
    } catch (error) {
      console.error("Error creating table:", error);
    }
  };
  
createTable();   

const RnaTable = new Table({
    ...dynamoSdkToToolbox(tableDefinition),
    DocumentClient
})

const RNA = new Entity({
    name: 'RNA',
    table: RnaTable,
    attributes: {
        id: { type: 'string', partitionKey: true, default: () => uuidv4() }, 
        isCompleted: 'boolean',
        communityName: 'string',
        communityType: 'string',
        location: 'string',
        creationDate: { type: 'string', default: () => new Date().toISOString() }
    }
});

module.exports = { RNA };