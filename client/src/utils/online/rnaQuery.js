import { api } from '../axios';

const rnasQuery = {
	queryKey: ['rnas'],
	queryFn: async () => (await api.get('/rnas')).data,
};

export default rnasQuery;
