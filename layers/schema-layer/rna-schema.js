import { Table, Entity } from 'dynamodb-toolbox';
import { dynamoDB } from '../aws-dynamo-connector';

const RnaTable = new Table({
    name: "Rnas",
    partitionKey: 'id',
    sortKey: 'creationDate',
    DocumentClient: dynamoDB
});

const RNA = new Entity({
    name: 'RNA',
    table: RnaTable,
    attributes: {
        id: 'string', 
        status: { type: 'number', default: 1 },
        communityName: 'string',
        communityType: 'string',
        location: 'string',
        creationDate: { type: 'string', default: () => new Date().toISOString() }
    }
});

export default { RNA };
