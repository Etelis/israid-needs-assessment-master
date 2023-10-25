import { useController } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const FormCheckbox = ({ name, control, label }) => {
  const { field } = useController({ name, control });

  return (
    <FormControlLabel
      control={<Checkbox {...field} />}
      label={label}
    />
  );
};

export default FormCheckbox;