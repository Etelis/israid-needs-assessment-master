const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export { dynamoDB };