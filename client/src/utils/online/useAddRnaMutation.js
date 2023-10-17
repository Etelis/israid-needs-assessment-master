import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../axios';

const useAddRnaMutation = (onSuccess = () => {}) => {
	const queryClient = useQueryClient();

	const addRna = async (newRna) => {
		const { data: newlyCreatedRna } = await api.post('/rnas', newRna);

		await queryClient.fetchQuery(['rnas']);

		return newlyCreatedRna;
	};

	return useMutation(addRna, { onSuccess });
};

export default useAddRnaMutation;
