import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ContinueButton } from '../../../components/ContinueButton';
import InputField from '../../../components/input-field/InputField';
import cacheRna from '../../../utils/cache/cacheRna';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { addRnaToDownloaded } from '../../../utils/cache/manageRnaDownloads';
import SelectInputField from '../../../components/input-field/SelectInputField';
import { getEmergencyOptions } from '../../../enums/Emergency';
import { useUser } from '../../../contexts/UserContext';

const AddRNA = () => {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { user } = useUser();
	const {
		register,
		handleSubmit,
		setValue,
		control,
		formState: { errors },
	} = useForm();

	const onSubmit = async (newRna) => {
		setIsLoading(true);

		const newRnaId = uuidv4();

		await cacheRna({
			...newRna,
			id: newRnaId,
			creatorMail: user.email,
			creatorName: user.name,
			createdOn: new Date().toISOString(),
		});

		await addRnaToDownloaded(newRnaId);

		setIsLoading(false);

		navigate(`/RNAs/${newRnaId}`, { replace: true });
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack height='90vh' spacing={2} p={2}>
				<Stack spacing={5} flexGrow={1}>
					<SelectInputField
						setValue={setValue}
						control={control}
						name='emergencies'
						validationSchema={{
							required: 'Emergencies is Required',
						}}
						label='Emergencies'
						placeholder='Choose Emergencies'
						options={getEmergencyOptions()}
					/>

					<InputField
						name='affectedHouseholds'
						register={register}
						validationSchema={{
							required: 'Affected Households is Required',
						}}
						errors={errors}
						type='text'
						label='Affected Households'
						placeholder='Number of affected Households'
					/>

					<InputField
						name='location'
						register={register}
						type='text'
						errors={errors}
						label='Location (optional)'
						placeholder='Precise coordination'
					/>

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
				</Stack>

				<ContinueButton type='submit' disabled={isLoading}>
					{isLoading ? 'Adding RNA...' : 'Add RNA'}
				</ContinueButton>
			</Stack>
		</form>
	);
};

export default AddRNA;
