const { Answer } = require('/opt/schema-layer/answer-schema.js');

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

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formattedAnswers),
		};
	} catch (error) {
		console.error(error);

		return {
			statusCode: 500,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ message: 'Internal Server Error' }),
		};
	}
};
