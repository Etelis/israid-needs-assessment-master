import { List, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ContinueButton } from '../../../components/ContinueButton';
import ProgressOverview from '../../../components/ProgressOverview';
import RNAFilterOptions from '../../../enums/RNAFilterOptions';
import getSavedAndCachedRnas from '../../../utils/cache/getSavedAndCachedRnas';
import { FilterActionButtons } from './FilterActionButtons';
import { ProgressCard } from './ProgressCard';
import { SearchFilter } from './SearchFilter';
import styles from './styles';
import { useQueryClient } from '@tanstack/react-query';
import useOnlineStatus from '../../../utils/useOnlineStatus';

export const RNAs = () => {
	const queryClient = useQueryClient();
	const [activeFilter, setActiveFilter] = useState(RNAFilterOptions.ALL);
	const [rnas, setRnas] = useState([]);
	const [nameFilter, setNameFilter] = useState('');
	const isOnline = useOnlineStatus();

	useEffect(() => {
		const getRnas = async () => {
			const allRnas = await getSavedAndCachedRnas(queryClient);

			setRnas(allRnas);
		};

		getRnas();
	}, []);

	const handleNameFilterChange = (event) => {
		setNameFilter(event.target.value);
	};

	const filteredRnas = rnas.filter((rna) => {
		const matchesActiveFilter =
			activeFilter === RNAFilterOptions.ONGOING ? !rna.isCompleted : true;

		if (!nameFilter) {
			return matchesActiveFilter;
		}

		const matchesNameFilter = rna?.communityName
			?.toLowerCase()
			.includes(nameFilter.toLowerCase());

		return matchesActiveFilter && matchesNameFilter;
	});

	return (
		<Stack spacing={3} sx={styles.rnasPage} alignItems='center'>
			<ProgressOverview
				rightColumnAmount={8512}
				rightColumnCaption='Questions Answered'
				leftColumnAmount={3}
				leftColumnCaption='RNAs Filled'
				isLeftColumnInPercentage={false}
			/>
			<FilterActionButtons setActiveFilter={setActiveFilter} />
			<SearchFilter
				placeholder='Search by name'
				onChange={handleNameFilterChange}
			/>
			<List sx={styles.rnasList}>
				{filteredRnas.map(
					({ id, lastSyncDate, creationDate, communityName }) => (
						<ProgressCard
							sx={styles.rna}
							value={Math.floor(Math.random() * 101)} // TODO: evaluate % based on number of questions answered
							key={id}
							lastSyncDate={new Date(
								lastSyncDate ?? creationDate
							).toLocaleDateString('en-US')}
							communityName={communityName}
							route={id}
						/>
					)
				)}
			</List>
			<ContinueButton
				link='add'
				sx={styles.newRnaButton}
				disabled={!isOnline}
			>
				<Typography>{isOnline ? 'New RNA' : 'Offline...'}</Typography>
			</ContinueButton>
		</Stack>
	);
};