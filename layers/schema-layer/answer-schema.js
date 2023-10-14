const { Table, Entity } = require('dynamodb-toolbox');
const { DocumentClient } = require('/opt/aws-dynamo-connector/index.js');
const { v4: uuidv4 } = require('uuid');

const AnswerTable = new Table({
    name: 'Answers', 
    partitionKey: 'id', 
    DocumentClient: DocumentClient, 
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
        creationDate: { type: 'string', default: () => new Date().toISOString() }
    }
});

module.exports = { Answer };