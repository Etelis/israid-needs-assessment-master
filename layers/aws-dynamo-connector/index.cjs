const AWS = require('aws-sdk');

console.log('REGION:', process.env.REGION);
console.log('ACCESS_KEY_ID:', process.env.ACCESS_KEY_ID);
console.log('SECRET_ACCESS_KEY:', process.env.SECRET_ACCESS_KEY);

AWS.config.update({
    region: process.env.REGION, 
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID, 
      secretAccessKey: process.env.SECRET_ACCESS_KEY 
    }
});

const dynamoDB = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

module.exports = { dynamoDB };