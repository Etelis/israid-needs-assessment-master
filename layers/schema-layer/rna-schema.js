import { Table, Entity } from 'dynamodb-toolbox';
import { DocumentClient } from '/opt/aws-dynamo-connector/index.js';

const RnaTable = new Table({
    name: "Rnas",
    partitionKey: 'id',
    sortKey: 'creationDate',
    DocumentClient: DocumentClient
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

export { RNA };
// export default { RNA };
