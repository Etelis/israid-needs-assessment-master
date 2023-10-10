import { TextField } from "@mui/material";
import styles from "./styles";

const InputField = ({
  name,
  label,
  register,
  errors,
  isRequired,
  type,
  validationSchema,
  placeholder,
}) => (
  <TextField
    sx={styles.inputField}
    label={label}
    required={isRequired}
    name={name}
    type={type}
    error={!!errors[name]}
    helperText={errors[name]?.message}
    placeholder={placeholder}
    {...register(name, validationSchema)}
  />
);

export default InputField;
