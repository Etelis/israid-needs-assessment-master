const { Category } = require('/opt/schema-layer/category-schema.js');
const {
	getSuccessResponse,
	getErrorResponse,
} = require('/opt/utils/http-objects.js');

const categoryData = {
	id: 'your_id',
	name: 'CategoryName',
	description: 'CategoryDescription',
	iconSrc: 'icon_source',
	subCategories: JSON.stringify([
		{ id: 'sub_id_1', name: 'SubCategory1' },
		{ id: 'sub_id_2', name: 'SubCategory2' },
	]),
};

exports.handler = async () => {
	try {
		const { Items: categories } = await Category.scan();

		const deserializedCategories = categories.map((category) => ({
			...category,
			subCategories: JSON.parse(category.subCategories),
		}));

		return getSuccessResponse(deserializedCategories);
	} catch (error) {
		console.error(error);

		return getErrorResponse(error);
	}
};
