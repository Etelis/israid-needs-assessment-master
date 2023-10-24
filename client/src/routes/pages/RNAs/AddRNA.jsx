import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ContinueButton } from '../../../components/ContinueButton';
import InputField from '../../../components/input-field/InputField';
import cacheRna from '../../../utils/cache/cacheRna';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import addRnaToDownloaded from '../../../utils/cache/addRnaToDownloaded';

const AddRNA = () => {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (newRna) => {
		setIsLoading(true);

		const newRnaId = uuidv4();

		await cacheRna({ ...newRna, id: newRnaId, createdOn: new Date() });

		await addRnaToDownloaded(newRnaId);

		setIsLoading(false);

		navigate(`/RNAs/${newRnaId}`, { replace: true });
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
