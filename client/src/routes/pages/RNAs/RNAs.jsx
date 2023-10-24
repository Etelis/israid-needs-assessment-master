import { List, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ContinueButton } from '../../../components/ContinueButton';
import ProgressOverview from '../../../components/ProgressOverview';
import RNAFilterOptions from '../../../enums/RNAFilterOptions';
import getSavedAndCachedRnas from '../../../utils/cache/getSavedAndCachedRnas';
import addRnaToDownloaded from '../../../utils/cache/addRnaToDownloaded';
import { FilterActionButtons } from './FilterActionButtons';
import { RnaCard } from './RnaCard';
import { SearchFilter } from './SearchFilter';
import styles from './styles';
import { useQueryClient } from '@tanstack/react-query';
import useOnlineStatus from '../../../utils/useOnlineStatus';

export const RNAs = () => {
	const queryClient = useQueryClient();
	const [activeFilter, setActiveFilter] = useState(RNAFilterOptions.ALL);
	const [allRnas, setAllRnas] = useState([]);
	const [nameFilter, setNameFilter] = useState('');
	const isOnline = useOnlineStatus();

	const getRnas = async () => {
		const rnas = await getSavedAndCachedRnas(queryClient);

		setAllRnas(rnas);
	};

	useEffect(() => {
		getRnas();
	}, []);

	const downloadRna = async (rnaId) => {
		if (isOnline) {
			await addRnaToDownloaded(rnaId);
			await getRnas();
		}
	};

	const handleNameFilterChange = (event) => {
		setNameFilter(event.target.value);
	};

	const filteredRnas = allRnas.filter((rna) => {
		const matchesActiveFilter =
			activeFilter === RNAFilterOptions.DOWNLOADED ? rna.isDownloaded : true;

		if (!nameFilter) {
			return matchesActiveFilter;
		}

		const matchesNameFilter = rna.communityName
			?.toLowerCase()
			.includes(nameFilter.toLowerCase());

		return matchesActiveFilter && matchesNameFilter;
	});

	const downloadedRnasAmount = () =>
		allRnas.reduce((sum, rna) => (rna.isDownloaded ? sum + 1 : sum), 0);

	return (
		<Stack spacing={3} sx={styles.rnasPage}>
			<ProgressOverview
				rightColumnAmount={allRnas.length}
				rightColumnCaption='Total RNAs'
				leftColumnAmount={downloadedRnasAmount()}
				leftColumnCaption='RNAs Downloaded'
				isLeftColumnInPercentage={false}
			/>
			<FilterActionButtons
				activeFilter={activeFilter}
				setActiveFilter={setActiveFilter}
			/>
			<SearchFilter
				placeholder='Search by name'
				onChange={handleNameFilterChange}
			/>
			<List sx={styles.rnasList}>
				{filteredRnas.map((rna) => (
					<RnaCard
						rna={rna}
						downloadHandler={() => downloadRna(rna.id)}
						key={rna.id}
					/>
				))}
			</List>
			<ContinueButton link='add' sx={styles.newRnaButton}>
				<Typography>New RNA</Typography>
			</ContinueButton>
		</Stack>
	);
};
