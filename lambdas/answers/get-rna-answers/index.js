const { Answer } = require('/opt/schema-layer/answer-schema.js');
const {
	getSuccessResponse,
	getErrorResponse,
} = require('/opt/utils/http-objects.js');

const formatAnswer = (answer) => ({
	id: answer.id,
	photos: answer.photos ? answer.photos : [],
	notes: answer.notes ? answer.notes : '',
	questionId: answer.questionId,
	rnaId: answer.rnaId,
	createdOn: answer.createdOn,
	value: answer.value.storedValue,
});

exports.handler = async (event) => {
	try {
		const { rnaId } = event.pathParameters;

		const { Items: answers } = await Answer.scan({
			filters: { attr: 'rnaId', eq: rnaId },
		});

		const formattedAnswers = answers.map(formatAnswer);

		return getSuccessResponse(formattedAnswers);
	} catch (error) {
		console.error(error);

		return getErrorResponse();
	}
};
