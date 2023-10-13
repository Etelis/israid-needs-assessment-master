const { Table, Entity } = require('dynamodb-toolbox');
const { DocumentClient } = require('/opt/aws-dynamo-connector/index.js');
const { v4: uuidv4 } = require('uuid');


const RnaTable = new Table({
    name: "Rnas",
    partitionKey: 'id',
    DocumentClient: DocumentClient
});

const RNA = new Entity({
    name: 'RNA',
    table: RnaTable,
    attributes: {
        id: { type: 'string', partitionKey: true, default: () => uuidv4() }, 
        status: { type: 'number', default: 1 },
        communityName: 'string',
        communityType: 'string',
        location: 'string',
        creationDate: { type: 'string', default: () => new Date().toISOString() }
    }
});

module.exports = { RNA };