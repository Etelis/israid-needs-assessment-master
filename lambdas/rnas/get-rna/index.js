const { RNA } = require('/opt/schema-layer/rna-schema.js');

exports.handler = async function () {
    try {
        const rnas = await RNA.scan();

        const formattedRnas = rnas.Items.map((rna) => {
            const { id, Creator, CreatorPosition, CreatorPhone, Emergency, AffectedHouseholds, communityName, 
                communityType, location, createdOn, lastUpdatedOn, answered, lastactivequestion, 
                isCompleted, severity } = rna;

            return {
                id,
                Creator,
                CreatorPosition,
                CreatorPhone,
                Emergency,
                AffectedHouseholds,
                communityName,
                communityType,
                location,
                createdOn,
                lastUpdatedOn,
                answered,
                lastactivequestion,
                isCompleted,
                severity
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