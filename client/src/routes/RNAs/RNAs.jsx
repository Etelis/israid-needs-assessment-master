import { List, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { ContinueButton } from '../../components/ContinueButton';
import ProgressOverview from '../../components/ProgressOverview';
import RNAFilterOptions from '../../enums/RNAFilterOptions';
import useRnasQuery from '../../utils/useRnasQuery';
import { FilterActionButtons } from './FilterActionButtons';
import { ProgressCard } from './ProgressCard';
import { SearchFilter } from './SearchFilter';
import styles from './styles';

export const RNAs = () => {
	const [activeFilter, setActiveFilter] = useState(RNAFilterOptions.ALL);
	const { data: rnas = [], isLoading } = useRnasQuery();
	const [nameFilter, setNameFilter] = useState('');

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
				{!isLoading &&
					filteredRnas.map(
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
			<ContinueButton link='add' sx={styles.newRnaButton}>
				<Typography>New RNA</Typography>
			</ContinueButton>
		</Stack>
	);
};