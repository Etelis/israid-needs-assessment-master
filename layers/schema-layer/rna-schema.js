import { Table, Entity } from 'dynamodb-toolbox';
import { dynamoDB } from '/opt/aws-dynamo-connector/index.js';

// console.log(dynamoDB)

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

export { RNA };
// export default { RNA };
