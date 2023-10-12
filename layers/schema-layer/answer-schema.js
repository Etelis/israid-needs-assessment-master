import { Entity, Table } from 'dynamodb-toolbox';
import { dynamoDB } from '../aws-dynamo-connector'; 

const AnswerTable = new Table({
    name: 'Answers', 
    partitionKey: 'id', 
    sortKey: 'creationDate', 
    DocumentClient: dynamoDB, 
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

export default { Answer };
