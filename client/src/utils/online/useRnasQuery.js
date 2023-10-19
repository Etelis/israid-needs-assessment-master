import { useQuery } from '@tanstack/react-query';
import { api } from '../axios';

const fetchRnas = async () => (await api.get('/rnas')).data;

export const rnasQuery = {
	queryKey: ['rnas'],
	queryFn: fetchRnas,
};

const useRnasQuery = () => useQuery(rnasQuery);

export default useRnasQuery;