const { Table, Entity } = require('dynamodb-toolbox');
const { DocumentClient } = require('/opt/aws-dynamo-connector/index.js');

const AnswerTable = new Table({
    name: 'Answers', 
    partitionKey: 'id', 
    sortKey: 'creationDate', 
    DocumentClient: DocumentClient, 
});

const Answer = new Entity({
    name: 'Answer',
    table: AnswerTable,
    attributes: {
        id: 'string',
        questionId: 'string',
        rnaId: 'string', 
        value: 'map',
        photos: { type: 'list', required: false }, 
        notes: { type: 'string', required: false },
        creationDate: { type: 'string', default: () => new Date().toISOString() }
    }
});

module.exports = { RNA };