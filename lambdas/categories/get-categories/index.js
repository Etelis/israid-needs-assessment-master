const { Category } = require('/opt/schema-layer/category-schema.js');
const {
	getSuccessResponse,
	getErrorResponse,
} = require('/opt/utils/http-objects.js');

exports.handler = async () => {
	try {
		const { Items: categories } = await Category.scan();

		return getSuccessResponse(categories);
	} catch (error) {
		console.error(error);

		return getErrorResponse();
	}
};
