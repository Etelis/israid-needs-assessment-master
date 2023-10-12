import { RNA } from '/opt/schema-layer/rna-schema.js'; 

export async function handler() {
    try {
        const rnas = await RNA.scan().exec();

        const formattedRnas = rnas.Items.map((rna) => {
            const {id, communityName, communityType, location, status, creationDate } = rna;

            return {
                id,
                communityName,
                communityType,
                location,
                status,
                creationDate
            };
        });

        return {
            statusCode: 200,
            body: JSON.stringify(formattedRnas),
        };
    } catch (error) {
        console.error(error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
}