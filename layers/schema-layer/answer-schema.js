const { Table, Entity } = require('dynamodb-toolbox');
const { DocumentClient } = require('/opt/aws-dynamo-connector/index.js');
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const { dynamoSdkToToolbox } = require('/opt/dynamoSdkToToolbox/index.js');

const DynamoDB = new AWS.DynamoDB();
const tableDefinition = {
	TableName: 'Answers',
	AttributeDefinitions: [
		{
			AttributeType: 'S',
			AttributeName: 'id',
		},
	],
	KeySchema: [
		{
			AttributeName: 'id',
			KeyType: 'HASH',
		},
	],
	BillingMode: 'PAY_PER_REQUEST',
};

const createTable = async () => {
	try {
		await DynamoDB.createTable(tableDefinition).promise();
		console.log('Table created successfully.');
	} catch (error) {
		console.error('Error creating table:', error);
	}
};

createTable();

const AnswerTable = new Table({
	...dynamoSdkToToolbox(tableDefinition),
	DocumentClient,
});

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
		createdOn: { type: 'string', default: () => new Date().toISOString() },
	},
});

module.exports = { Answer };
