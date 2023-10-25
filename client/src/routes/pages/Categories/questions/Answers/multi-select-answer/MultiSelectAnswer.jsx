import { Grid } from '@mui/material';
import SelectOption from './SelectOption';

const MultiSelectAnswer = ({
	selectedOptions = [],
	setSelectedOptions,
	options,
}) => {
	const onSelect = (option) => {
		let newSelected;

		if (selectedOptions.includes(option)) {
			newSelected = [...selectedOptions.filter((x) => x !== option)];
		} else {
			newSelected = [...selectedOptions, option];
		}

		setSelectedOptions(newSelected);
	};

	return (
		<Grid container spacing={2} p={2} pl={0}>
			{options.map((option) => (
				<Grid key={option} item xs={6}>
					<SelectOption
						option={option}
						isSelected={selectedOptions.includes(option)}
						onClick={() => onSelect(option)}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default MultiSelectAnswer;
