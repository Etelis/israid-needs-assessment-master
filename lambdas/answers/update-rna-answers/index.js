import { Answer } from '/opt/schema-layer/answer-schema.js'; 

export async function handler(event) {
    try {
        const { rnaId } = event.params;
        const { answers: newAnswers } = JSON.parse(event.body);
        
        const oldAnswers = await Answer.query('rnaId').eq(rnaId).exec();
        
        const updatedAnswers = newAnswers.map((newAnswer) => {
            const oldAnswer = oldAnswers.find((x) => x.questionId === newAnswer.questionId);
            
            if (!oldAnswer) {
                return new Answer({ ...newAnswer, rnaId });
            }

            if (!hasAnswerChanged(oldAnswer, newAnswer)) {
                return null;
            }
            
            oldAnswer.value = newAnswer.value;
            oldAnswer.photos = newAnswer.photos;
            oldAnswer.notes = newAnswer.notes;
            
            return oldAnswer;
        });
        
        const filteredAnswers = updatedAnswers.filter((x) => x);
        
        await Answer.batchPut(filteredAnswers).exec();
        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Answers updated successfully' }),
        };
    } catch (error) {
        console.error(error);
        
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
}

const hasAnswerChanged = (oldAnswer, newAnswer) => {
    if (!newAnswer) {
        return false;
    }

    return newAnswer.value !== oldAnswer.value || JSON.stringify(newAnswer.photos) !== JSON.stringify(oldAnswer.photos) || newAnswer.notes !== oldAnswer.notes;
};