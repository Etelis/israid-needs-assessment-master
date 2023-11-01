const { RNA } = require('/opt/schema-layer/rna-schema.js');
const {
	getSuccessResponse,
	getErrorResponse,
} = require('/opt/utils/http-objects.js');

exports.handler = async () => {
	try {
		const { Items: rnas } = await RNA.scan();

		return getSuccessResponse(rnas);
	} catch (error) {
		console.error(error);

		return getErrorResponse();
	}
};
