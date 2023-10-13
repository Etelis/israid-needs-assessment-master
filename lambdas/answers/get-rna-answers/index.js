import { Answer } from '/opt/schema-layer/answer-schema'; 

export async function handler(event) {
    try {
        const { rnaId } = event.pathParameters;

        const answers = await Answer.query('rnaId').eq(rnaId).exec();

        return {
            statusCode: 200,
            body: answers,
        };
    } catch (error) {
        console.error(error);

        return {
            statusCode: 500,
            body: 'Internal Server Error',
        };
    }
}