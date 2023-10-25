const { RNA } = require('/opt/schema-layer/rna-schema.js');

//TODO: delete lambda?
exports.handler = async function (event) {
	try {
		const newRna = JSON.parse(event.body);

		// Find the item in DynamoDB using the ID
		const { Item: existingRna } = await RNA.get({ id: newRna.id });

		if (!existingRna) {
			return {
				statusCode: 404,
				body: JSON.stringify({ message: 'Item not found.' }),
			};
		}

		// Perform the update using the dynamodb-toolbox Entity
		const updatedRna = await RNA.update(newRna);

		return {
			statusCode: 200,
			body: JSON.stringify(updatedRna),
		};
	} catch (error) {
		console.error(error);

		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Internal Server Error' }),
		};
	}
};
