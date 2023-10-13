const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

console.log('REGION:', process.env.REGION);
console.log('ACCESS_KEY_ID:', process.env.ACCESS_KEY_ID);
console.log('SECRET_ACCESS_KEY:', process.env.SECRET_ACCESS_KEY);


console.log('AWS REGION:', process.env.AWS_REGION);
console.log('ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID);
console.log('SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY);

// Load credentials from environment variables
const dynamoDBClient = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);

module.exports = { DocumentClient };