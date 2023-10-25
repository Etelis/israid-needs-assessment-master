import { FormProvider, useForm } from "react-hook-form";

export const Form = ({ children, onSubmit, sx }) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} style={{ ...sx }}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;