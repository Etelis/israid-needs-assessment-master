import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useOnlineStatus from '../useOnlineStatus';
import { downloadedRnaAnswersQueries } from './useDownloadedRnasAnswersQuery';
import { rnasQuery } from './useRnasQuery';

const useLoadApplicationData = () => {
	const [isLoading, setIsLoading] = useState(true);
	const queryClient = useQueryClient();
	const isOnline = useOnlineStatus();

	useEffect(() => {
		const fetchApplicationData = async () => {
			if (isOnline) {
				await queryClient.ensureQueryData(rnasQuery);

				const answerQueries = await downloadedRnaAnswersQueries();

				const queriesCalls = answerQueries.map((query) =>
					queryClient.ensureQueryData(query)
				);

				await Promise.all(queriesCalls);
			}

			setIsLoading(false);
		};

		fetchApplicationData();
	}, []);

	return isLoading;
};

export default useLoadApplicationData;
