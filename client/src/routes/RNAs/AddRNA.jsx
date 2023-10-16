import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ContinueButton } from '../../components/ContinueButton';
import InputField from '../../components/input-field/InputField';
import useAddRnaMutation from '../../utils/useAddRnaMutation';

const AddRNA = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { mutate: addRna, isLoading } = useAddRnaMutation();

	const onSubmit = (data) => {
		addRna(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={2} margin={2}>
				<InputField
					name='communityName'
					register={register}
					validationSchema={{
						required: 'Community Name is Required',
					}}
					errors={errors}
					type='text'
					label='Community Name'
					placeholder='Where are you?'
				/>

				<InputField
					name='communityType'
					register={register}
					validationSchema={{
						required: 'Community Type is Required',
					}}
					type='text'
					label='Community Type'
					errors={errors}
					placeholder='School, Hospital, Community Center, etc...'
				/>

				<InputField
					name='location'
					register={register}
					type='text'
					errors={errors}
					label='Location (optional)'
					placeholder='Precise coordination'
				/>

				<ContinueButton type='submit' disabled={isLoading}>
					{isLoading ? 'Adding RNA...' : 'Add RNA'}
				</ContinueButton>
			</Stack>
		</form>
	);
};

export default AddRNA;