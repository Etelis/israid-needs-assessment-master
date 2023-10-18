//TODO: when syncing needs to pull all data from the db, upload the local cache, delete the local cache
//TODO: this page is accessible only if internet is present
//TODO: if internet is present and the user has un synced updates (answered new questions for example)
//TODO: than pop a reminder to the user that he should sync now (every 15 min or so)

import SyncIcon from '@mui/icons-material/Sync';
import { Button, LinearProgress, Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { get, set } from 'idb-keyval';
import { useEffect, useState } from 'react';
import useUpdateRnaAnswersMutation from '../../utils/online/useUpdateRnaAnswersMutation';
import useUploadLocalCache from '../../utils/online/useUploadLocalCache';
import useLocalCacheChanges from '../../utils/useLocalCacheChanges';
import styles from './styles';

const formatDate = (date) => date;

const SynchronizationPage = () => {
	const [lastSynced, setLastSynced] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const queryClient = useQueryClient();
	const { mutateAsync: updateAnswersMutation } =
		useUpdateRnaAnswersMutation();
	const [cacheChanges, setCacheChanges] = useState([]);

	useEffect(() => {
		const fetchSyncDate = async () => {
			const lastSync = await get('lastSync');

			setLastSynced(lastSync);
		};

		const fetchCacheChanges = async () => {
			const localCacheChanges = await useLocalCacheChanges();

			setCacheChanges(localCacheChanges);
		};

		fetchSyncDate();
		fetchCacheChanges();
	}, []);

	const onSync = async () => {
		setIsLoading(true);

		await queryClient.refetchQueries();

		await useUploadLocalCache(queryClient, updateAnswersMutation);

		await set('lastSync', new Date());

		await queryClient.refetchQueries();

		setIsLoading(false);
	};

	const getSyncButtonText = () => {
		if (cacheChanges.length > 0) {
			return isLoading ? 'Synchronizing...' : 'Synchronize';
		}

		return isLoading ? 'Checking...' : 'Check for updates';
	};

	return (
		<Stack p={2} justifyContent='space-around' alignItems='center'>
			<Stack
				height='40vh'
				justifyContent='space-around'
				alignItems='center'
			>
				<Stack spacing={1}>
					<Typography variant='h4' textAlign='center'>
						<b>Synchronize The Data</b>
					</Typography>
					<Typography variant='h6' textAlign='center'>
						<b>Last Synced: {formatDate(lastSynced)}</b>
					</Typography>
				</Stack>
				<Button
					variant='outlined'
					endIcon={<SyncIcon />}
					onClick={onSync}
					disabled={isLoading}
					sx={styles.syncButton}
				>
					{getSyncButtonText()}
				</Button>
			</Stack>
			<Stack
				height='40vh'
				justifyContent='space-around'
				alignItems='center'
			>
				<img width={350} src='/Logo-Israaid.svg.png' />
				{isLoading && (
					<Stack spacing={2} sx={{ width: '70%' }}>
						<LinearProgress sx={styles.progressBar} />
						<Typography variant='h6' textAlign='center'>
							Uploading Local Files...
						</Typography>
					</Stack>
				)}
			</Stack>
		</Stack>
	);
};

export default SynchronizationPage;
