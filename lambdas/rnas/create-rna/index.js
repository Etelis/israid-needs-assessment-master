const { RNA } = require('/opt/schema-layer/rna-schema.js');

exports.handler = async function (event, context) {
    const { communityName, communityType, location } = event;
   
    const rnaItem = {
        communityName,
        communityType,
        location
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