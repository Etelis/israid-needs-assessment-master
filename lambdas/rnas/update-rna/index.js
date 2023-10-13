const { RNA } = require('/opt/schema-layer/rna-schema.js');

exports.handler = async function (event) {
    try {
        const requestBody = JSON.parse(event.body);
        const { id, status, communityName, communityType, location, creationDate } = requestBody;

        if (!id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'id is required for the update.' }),
            };
        }

        const existingRna = await RNA.get(id);

        if (!existingRna) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'RNA record not found.' }),
            };
        }

        const updatedRna = await RNA.update({
            ...existingRna,
            status,
            communityName,
            communityType,
            location,
            creationDate,
        });

        return {
            statusCode: 200,
            body: JSON.stringify(updatedRna),
        };
    } catch (error) {
        console.error(error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
}