const { RNA } = require('/opt/schema-layer/rna-schema.js');

exports.handler = async () => {
	try {
		const { Items: rnas } = await RNA.scan();

		/*const formattedRnas = rnas.map((rna) => ({
			...rna,
			createdOn: new Date(rna.createdOn),
			lastUpdatedOn: rna.lastUpdatedOn
				? new Date(rna.lastUpdatedOn)
				: null,
		}));
		*/

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': process.env.CORS
			},
			body: JSON.stringify(rnas),
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
