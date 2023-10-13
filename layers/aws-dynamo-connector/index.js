const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

// Load credentials from environment variables
const draft_dynamoDBClient = new DynamoDBClient({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    }
});

const dynamoDBClient = new DynamoDBClient();

const DocumentClient = DynamoDBDocumentClient.from(dynamoDBClient);

module.exports = { DocumentClient };