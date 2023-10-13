const { RNA } = require('/opt/schema-layer/rna-schema.js');

exports.handler = async function (event) {
    try {
        const { id, status, communityName, communityType, location, creationDate } = event;

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
        const updatedAttributes = event

        for (const [key, value] of Object.entries(updatedAttributes)) {
            existingRna[key] = value
        }

        await existingRna.save()

        return {
            statusCode: 200,
            body: existingRna,
        };
    } catch (error) {
        console.error(error);

        return {
            statusCode: 500,
            body: 'Internal Server Error',
        };
    }
}