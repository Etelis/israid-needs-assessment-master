const { RNA } = require('/opt/schema-layer/rna-schema.js');

//TODO: delete this lambda?
exports.handler = async (event) => {
	const newRna = JSON.parse(event.body);

	try {
		const newlyCreatedRna = await RNA.put(newRna);

		return {
			statusCode: 200,
			// headers: {
			// 	'Content-Type': 'application/json',
			// },
			body: JSON.stringify(newlyCreatedRna),
		};
	} catch (error) {
		console.error(error);

		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Internal Server Error' }),
		};
	}
};
