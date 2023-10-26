const { RNA } = require('/opt/schema-layer/rna-schema.js');

exports.handler = async () => {
	try {
		const { Items: rnas } = await RNA.scan();

		const formattedRnas = rnas.map((rna) => ({
			...rna,
			createdOn: new Date(rna.createdOn),
			lastUpdatedOn: rna.lastUpdatedOn
				? new Date(rna.lastUpdatedOn)
				: null,
		}));

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json',
			},
			body: formattedRnas,
		};
	} catch (error) {
		console.error(error);

		return {
			statusCode: 500,
			headers: {
				'Content-Type': 'application/json',
			},
			body: 'Internal Server Error',
		};
	}
};
