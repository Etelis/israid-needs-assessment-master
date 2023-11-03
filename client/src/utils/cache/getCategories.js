import { toast } from 'react-toastify';

export const getCategoriesForState = (setState, queryClient) => {
	const allCategories = getCategories(queryClient);

	setState(allCategories);
};

const getCategories = (queryClient) => {
	try {
		const categories = queryClient.getQueryData(['categories']) ?? [];

		return categories;
	} catch (error) {
		console.log(error);
		const errorMessage = 'Something Went Wrong Getting Categories';

		toast.error(errorMessage, { toastId: errorMessage });
	}
};

export default getCategories;
