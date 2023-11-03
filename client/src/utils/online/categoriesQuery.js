import { api } from '../axios';

const categoriesQuery = {
	queryKey: ['categories'],
	queryFn: async () => (await api.get('/categories')).data,
};

export default categoriesQuery;
