const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

const dynamoDBClient = new DynamoDBClient();

const DocumentClient = DynamoDBDocumentClient.from(dynamoDBClient);

module.exports = { DocumentClient };