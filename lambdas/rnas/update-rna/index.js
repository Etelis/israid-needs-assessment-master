const { RNA } = require('/opt/schema-layer/rna-schema.js');

exports.handler = async function (event) {
    try {
        const { id } = event;

        if (!id) {
            return {
                statusCode: 400,
                body: 'id is required for the update.',
            };
        }
        
        // Find the item in DynamoDB using the ID
        const { Item: existingRna }= await RNA.get({"id":id});

        if (!existingRna) {
            return {
                statusCode: 404,
                body: 'Item not found.',
            };
        }
        
        // Perform the update using the dynamodb-toolbox Entity
        const updatedRna = await RNA.update(event);

        return {
            statusCode: 200,
            body: updatedRna,
        };
    } catch (error) {
        console.error(error);

        return {
            statusCode: 500,
            body: 'Internal Server Error',
        };
    }
}