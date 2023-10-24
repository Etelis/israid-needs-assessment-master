import { Button, Stack } from '@mui/material';
import RNAFilterOptions from '../../../../enums/RNAFilterOptions';
import { styles } from './styles';

const FilterActionButtons = ({ activeFilter, setActiveFilter }) => {
	const handleButtonClick = (newFilterOption) => {
		setActiveFilter(newFilterOption);
	};

	return (
		<Stack direction='row' width='100%' justifyContent='center' spacing={2}>
			<Button
				variant='contained'
				sx={styles.button(activeFilter === RNAFilterOptions.DOWNLOADED)}
				onClick={() => handleButtonClick(RNAFilterOptions.DOWNLOADED)}
			>
				Downloaded
			</Button>
			<Button
				variant='contained'
				sx={styles.button(activeFilter === RNAFilterOptions.ALL)}
				onClick={() => handleButtonClick(RNAFilterOptions.ALL)}
			>
				All
			</Button>
		</Stack>
	);
};

export default FilterActionButtons;
