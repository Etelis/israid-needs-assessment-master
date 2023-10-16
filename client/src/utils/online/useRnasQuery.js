import { useQuery } from '@tanstack/react-query';
import { api } from '../axios';

const useRnasQuery = () => {
	const fetchRnas = async () => (await api.get('/rnas')).data;

	return useQuery(['rnas'], fetchRnas);
};

export default useRnasQuery;