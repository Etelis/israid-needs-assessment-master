import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ContinueButton } from '../components/ContinueButton';
import InputField from '../components/input-field/InputField';

const AddEvent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    //TODO: call api to add new RNA
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} margin={2}>
        <InputField
          name='communityName'
          register={register}
          validationSchema={{ required: 'Community Name is Required' }}
          errors={errors}
          type='text'
          label='Community Name'
          placeholder='Where are you?'
        />

        <InputField
          name='type'
          register={register}
          validationSchema={{ required: 'Type is Required' }}
          type='text'
          label='Type'
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

        <ContinueButton type='submit'>Add RNA</ContinueButton>
      </Stack>
    </form>
  );
};

export default AddEvent;
