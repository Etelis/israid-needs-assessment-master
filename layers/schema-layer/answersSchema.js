// layer/schema-layer/answersSchema.js

const { Table, Entity } = require('dynamodb-toolbox');

const AnswersTable = new Table({
    name: process.env.ANSWERS_TABLE,
    partitionKey: 'questionId',
    sortKey: 'rnaId',
    DocumentClient: require('../aws-sdk-layer').dynamoDB
});

const Answer = new Entity({
    name: 'Answer',
    table: AnswersTable,
    attributes: {
        questionId: 'string',
        rnaId: 'string', 
        value: 'map', 
        photos: { type: 'list', required: false }, 
        notes: { type: 'string', required: false }
    }
});

module.exports = { Answer };
