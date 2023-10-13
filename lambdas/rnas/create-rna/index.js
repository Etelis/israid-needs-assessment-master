const { RNA } = require('/opt/schema-layer/rna-schema.js');
const { v4: uuidv4 } = require('uuid');




exports.handler = async function (event, context) {
    console.log(event.communityName)
    const { communityName, communityType, location } = event;
    // Generate a unique ID
    const uniqueId = uuidv4();
    
    const rnaItem = {
        id:uniqueId,
        communityName,
        communityType,
        location
    };

    try {
        await RNA.put(rnaItem);
        return {
            statusCode: 200,
            body: JSON.stringify(rnaItem)
        };
    } catch (error) {
        console.error(error);
        
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
}