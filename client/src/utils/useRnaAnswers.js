const useRnaAnswers = (rnaId, queryClient) =>
	queryClient.getQueryData(['answers', rnaId]);

export default useRnaAnswers;