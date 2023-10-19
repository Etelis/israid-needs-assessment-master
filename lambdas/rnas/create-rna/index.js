const { RNA } = require('/opt/schema-layer/rna-schema.js');

exports.handler = async function (event, context) {
    const { Creator, CreatorPosition, CreatorPhone, Emergency, AffectedHouseholds, communityName, 
        communityType, location, createdOn, lastUpdatedOn, answered, lastactivequestion, 
        isCompleted, severity } = event;
   
    const rnaItem = { // Took out ID field
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

    try {
        await RNA.put(rnaItem);
        return {
            statusCode: 200,
            body: rnaItem
        };
    } catch (error) {
        console.error(error);
        
        return {
            statusCode: 500,
            body: 'Internal Server Error',
        };
    }
}