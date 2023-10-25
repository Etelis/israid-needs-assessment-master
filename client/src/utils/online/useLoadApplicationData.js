import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useOnlineStatus from '../useOnlineStatus';
import fetchDownloadedRnaAnswersQueries from './fetchDownloadedRnaAnswersQueries';
import rnasQuery from './rnaQuery';

const useLoadApplicationData = () => {
	const [isLoading, setIsLoading] = useState(true);
	const queryClient = useQueryClient();
	const isOnline = useOnlineStatus();

	useEffect(() => {
		const fetchApplicationData = async () => {
			if (isOnline) {
				await queryClient.ensureQueryData(rnasQuery);

				await fetchDownloadedRnaAnswersQueries(queryClient);
			}

			setIsLoading(false);
		};

		fetchApplicationData();
	}, []);

	return isLoading;
};

export default useLoadApplicationData;
