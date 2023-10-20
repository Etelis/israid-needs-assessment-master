//TODO: when syncing needs to pull all data from the db, upload the local cache, delete the local cache
//TODO: if internet is present and the user has un synced updates (answered new questions for example)
//TODO: than pop a reminder to the user that he should sync now (every 15 min or so)

import SyncIcon from '@mui/icons-material/Sync';
import { Button, LinearProgress, Stack, Typography } from '@mui/material';
import { get } from 'idb-keyval';
import { useEffect, useState } from 'react';
import {cacheUsageKeyTypes} from '../../../utils/cache/cacheKeyTypes';
import useSynchronizeMutation from '../../../utils/online/useSynchronizeMutation';
import getLocalCacheChanges from '../../../utils/cache/getLocalCacheChanges';
import styles from './styles';

const formatDate = (date) => date;

const SynchronizationPage = () => {
	const [lastSynced, setLastSynced] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [cacheChanges, setCacheChanges] = useState([]);
	const { mutateAsync: synchronize } = useSynchronizeMutation();

	const getLastSync = async () => {
		const lastSync = await get(cacheUsageKeyTypes.lastSync);

		setLastSynced(lastSync);
	};

	const getCacheChanges = async () => {
		const localCacheChanges = await getLocalCacheChanges();

		setCacheChanges(localCacheChanges);
	};

	useEffect(() => {
		getLastSync();
		getCacheChanges();
	}, []);

	const onSync = async () => {
		setIsLoading(true);

		await synchronize();

		await Promise.all([getLastSync(), getCacheChanges()]);

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
				{cacheChanges.length > 0 && (
					<Typography variant='h6'>
						{`You have ${cacheChanges.length} local changes to upload`}
					</Typography>
				)}
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
