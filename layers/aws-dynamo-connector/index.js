const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

const dynamoDBClient = new DynamoDBClient({region: process.env.AWS_REGION});
console.log(dynamoDBClient)

const DocumentClient = DynamoDBDocumentClient.from(dynamoDBClient);

module.exports = { DocumentClient };