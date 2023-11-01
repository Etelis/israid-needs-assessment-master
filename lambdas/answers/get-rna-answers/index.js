const { Answer } = require('/opt/schema-layer/answer-schema.js');
const {
	getSuccessResponse,
	getErrorResponse,
} = require('/opt/utils/http-objects.js');

exports.handler = async (event) => {
	try {
		const { rnaId } = event.pathParameters;

		const { Items: answers } = await Answer.scan({
			filters: { attr: 'rnaId', eq: rnaId },
		});

		const formattedAnswers = answers.map((answer) => ({
			...answer,
			createdOn: new Date(answer.createdOn),
		}));

		return getSuccessResponse(formattedAnswers);
	} catch (error) {
		console.error(error);

		return getErrorResponse();
	}
};
