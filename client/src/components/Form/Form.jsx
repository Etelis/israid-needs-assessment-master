import { FormProvider, useForm } from "react-hook-form";
import styles from './styles';

export const Form = ({ children, onSubmit, sx }) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} style={{ ...styles.form, ...sx }}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;