import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../axios';

const useAddRnaMutation = () => {
	const queryClient = useQueryClient();

	const addRna = async (newRna) =>
		await api.post('/rnas', newRna).then(async ({data: newRna}) => {
			await queryClient.fetchQuery(['rnas']);
			
			return newRna;
		});

	return useMutation(addRna);
};

export default useAddRnaMutation;