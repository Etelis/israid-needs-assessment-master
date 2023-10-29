import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';
import { Controller } from 'react-hook-form';

const SelectInputField = ({
	name,
	label,
	validationSchema,
	placeholder,
	options,
	setValue,
	control,
}) => {
	const handleSelectChange = (event) => {
		setValue(name, event.target.value);
	};

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={[]}
			rules={validationSchema}
			render={({ field, fieldState }) => (
				<FormControl
					error={!!fieldState.error && field.value.length === 0}
				>
					<InputLabel>{label}</InputLabel>
					<Select
						label={name}
						id={name}
						sx={{ borderRadius: '10px' }}
						multiple
						onChange={handleSelectChange}
						value={field.value}
					>
						<MenuItem value='' disabled>
							<em>{placeholder}</em>
						</MenuItem>
						{options.map((option) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</Select>
					{!!fieldState.error && field.value.length === 0 && (
						<FormHelperText>
							{fieldState.error?.message}
						</FormHelperText>
					)}
				</FormControl>
			)}
		/>
	);
};

export default SelectInputField;
