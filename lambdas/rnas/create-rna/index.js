import { RNA } from '/opt/schema-layer/rna-schema'; 

export async function handler(event) {
    const { communityName, communityType, location } = JSON.parse(event.body);

    const rnaItem = {
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