import categories from '../../../../client/src/static-data/categories.json';
import subCategories from '../../../../client/src/static-data/sub-categories.json';

export const getCategories = async (req, res, next) => {
	const allCategories = categories.map((category) => ({
		...category,
		subCategories: subCategories.filter(
			(subCategory) => subCategory.categoryId === category.id
		),
	}));

	res.send(allCategories);
};
