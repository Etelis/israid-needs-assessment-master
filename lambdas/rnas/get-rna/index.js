const { RNA } = require('/opt/schema-layer/rna-schema.js');

exports.handler = async function () {
    try {
        const rnas = await RNA.scan();

        const formattedRnas = rnas.Items.map((rna) => {
            const { id, communityName, communityType, location, status, creationDate } = rna;

            return {
                id,
                communityName,
                communityType,
                location,
                status,
                creationDate,
            };
        });

        return {
            statusCode: 200,
            body: formattedRnas,
        };
    } catch (error) {
        console.error(error);

        return {
            statusCode: 500,
            body: 'Internal Server Error',
        };
    }
};