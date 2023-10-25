import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from './styles';

const SearchFilter = ({ placeholder, onChange }) => {
	return (
		<TextField
			variant='outlined'
			placeholder={placeholder}
			size='small'
			onChange={onChange}
			InputProps={{
				startAdornment: (
					<InputAdornment position='start'>
						<SearchIcon color='disabled' />
					</InputAdornment>
				),
				style: styles.searchFilter,
			}}
			sx={styles.searchFilterContainer}
		/>
	);
};

export default SearchFilter;
