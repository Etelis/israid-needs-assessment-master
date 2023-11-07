import { toast } from 'react-toastify';

// TODO categories: Remove when fixed
import categories from '../../static-data/categories.json';
import subCategories from '../../static-data/sub-categories.json';

export const getCategoriesForState = (setState, queryClient) => {
	const allCategories = getCategories(queryClient);

	setState(allCategories);
};

const getCategories = (queryClient) => {
	try {
		// TODO categories:
		// const categories = queryClient.getQueryData(['categories']) ?? [];
		// 
		// return categories;

		const combinedCategories = categories.map((category) => ({
			...category,
			subCategories: subCategories
				.filter((sub) => sub.categoryId === category.id)
				.map((sub) => ({ id: sub.id, name: sub.name })),
		}));

		return combinedCategories;
	} catch (error) {
		console.log(error);
		const errorMessage = 'Something Went Wrong Getting Categories';

		toast.error(errorMessage, { toastId: errorMessage });
	}
};

export default getCategories;
