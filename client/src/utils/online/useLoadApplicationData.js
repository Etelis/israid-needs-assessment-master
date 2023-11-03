import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useOnlineStatus from '../useOnlineStatus';
import fetchDownloadedRnaAnswersQueries from './fetchDownloadedRnaAnswersQueries';
import rnasQuery from './rnaQuery';
import categoriesQuery from './categoriesQuery';

const useLoadApplicationData = () => {
	const [isLoading, setIsLoading] = useState(true);
	const queryClient = useQueryClient();
	const isOnline = useOnlineStatus();

	useEffect(() => {
		const fetchApplicationData = async () => {
			if (isOnline) {
				await Promise.all([
					queryClient.ensureQueryData(rnasQuery),
					queryClient.ensureQueryData(categoriesQuery),
				]);

				await fetchDownloadedRnaAnswersQueries(queryClient);
			}

			setIsLoading(false);
		};

		fetchApplicationData();
	}, []);

	return isLoading;
};

export default useLoadApplicationData;
