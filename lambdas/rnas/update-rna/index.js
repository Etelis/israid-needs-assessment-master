const { RNA } = require('/opt/schema-layer/rna-schema.js');

exports.handler = async function (event) {
    try {
        const requestBody = JSON.parse(event.body);
        const { id, status, communityName, communityType, location, creationDate } = requestBody;

        if (!id) {
            return {
                statusCode: 400,
                body: 'id is required for the update.',
            };
        }

        const existingRna = await RNA.get(id);

        if (!existingRna) {
            return {
                statusCode: 404,
                body: 'RNA record not found.',
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