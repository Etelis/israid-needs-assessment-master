const DynamoDBClient = require('@aws-sdk/client-dynamodb')
const DynamoDBDocumentClient = require('@aws-sdk/lib-dynamodb')
const fromEnv = require('@aws-sdk/credential-provider-env')

console.log('REGION:', process.env.REGION);
console.log('ACCESS_KEY_ID:', process.env.ACCESS_KEY_ID);
console.log('SECRET_ACCESS_KEY:', process.env.SECRET_ACCESS_KEY);



console.log('AWS REGION:', process.env.AWS_REGION);
console.log('ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID);
console.log('SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY);

// Load credentials from environment variables
const credentials = fromEnv();

// Set the region and credentials when initializing the DynamoDBClient
const dynamoDBClient = new DynamoDBClient({
  region: process.env.AWS_REGION, // AWS region from environment variables
  credentials: credentials,
});

// Initialize the DocumentClient using the DynamoDBClient instance
const DocumentClient = DynamoDBDocumentClient.from(dynamoDBClient, {});

module.exports = { DocumentClient };