const { RNA } = require('/opt/schema-layer/rna-schema.js');

exports.handler = async function () {
    try {
        const rnas = await RNA.scan();

        const formattedRnas = rnas.Items.map((rna) => {
            const { id, isCompleted, communityName, communityType, lastUpdatedOn, createdOn, location, answered, 
                lastactivequestion, severity } = rna;

            return {
                id,
                isCompleted,
                communityName,
                communityType,
                lastUpdatedOn,
                createdOn,
                location,
                answered,
                lastactivequestion,
                severity,
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