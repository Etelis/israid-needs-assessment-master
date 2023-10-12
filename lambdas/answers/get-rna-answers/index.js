import { Answer } from '/opt/schema-layer/answer-schema'; 

export async function handler(event) {
    try {
        const { rnaId } = event.pathParameters;

        const answers = await Answer.query('rnaId').eq(rnaId).exec();

        return {
            statusCode: 200,
            body: JSON.stringify(answers),
        };
    } catch (error) {
        console.error(error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
}