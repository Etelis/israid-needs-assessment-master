const { Table, Entity } = require('dynamodb-toolbox');

const RnaTable = new Table({
    name: process.env.RNA_TABLE,
    partitionKey: 'communityName',
    sortKey: 'creationDate',
    DocumentClient: require('../aws-dynamo-connector').dynamoDB
});

const RNA = new Entity({
    name: 'RNA',
    table: RnaTable,
    attributes: {
        communityName: 'string',
        communityType: 'string',
        location: 'string',
        status: { type: 'number', default: 1 },
        creationDate: { type: 'string', default: () => new Date().toISOString() },
        lastUpdateDate: 'string'
    }
});

module.exports = { RNA };