import { useController } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import styles from './styles';

const FormInputText = ({ name, control, label, sx }) => {
  const { field, fieldState } = useController({ name, control });

  return (
    <TextField
      {...field}
      size="small"
      error={!!fieldState.error}
      helperText={fieldState.error ? fieldState.error.message : null}
      fullWidth
      label={label}
      variant="outlined"
      sx={{ ...styles.textField, ...sx }}
    />
  );
};

export default FormInputText;