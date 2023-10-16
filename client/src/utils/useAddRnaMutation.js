import { useMutation } from '@tanstack/react-query';
import { api } from './axios';

const useAddRnaMutation = () => useMutation(async (newRna) => await api.post("/rnas", newRna));

export default useAddRnaMutation;