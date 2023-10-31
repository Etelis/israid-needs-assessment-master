import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Alert, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import userPool from "../../../../cognito-config";
import convertCognitoErrorToMessage from "../../../utils/aws-cognito/cognito-error-converter";
import authValidationSchema from "../utils/authValidationSchema";
import { toast } from 'react-toastify';
import { useUser } from "../../../contexts/UserContext/UserContext";
import { Form, FormInputText } from "../../../components/Form";
import { IsraaidLogo } from "../components/IsraaidLogo";
import styles from "./styles";

const Register = () => {
  const [error, setError] = useState(null);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      position: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (data) => {
    const { email, password, name, position, phoneNumber } = data;

    const attributeList = [
      new CognitoUserAttribute({ Name: "name", Value: name }),
      new CognitoUserAttribute({ Name: "custom:position", Value: position }),
      new CognitoUserAttribute({ Name: "phone_number", Value: phoneNumber }),
    ];

    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        setError(convertCognitoErrorToMessage(err.code));

        return;
      }

      setError(null);
      setUser({ name, email, position, phoneNumber });
      toast.success("Registration successful! Please verify your email.");
      navigate("/login"); 
    });
  };

  return (
    <Stack height='100vh' py='10vh'>
      <IsraaidLogo />
      <Form onSubmit={handleSubmit(onSubmit)} sx={styles.form}>
        {error && <Alert severity="error">{error}</Alert>}
        <FormInputText
          name="name"
          control={control}
          label="Name"
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          sx={styles.inputText}
        />
        <FormInputText
          name="email"
          control={control}
          label="Email"
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          sx={styles.inputText}
        />
        <FormInputText
          name="password"
          control={control}
          label="Password"
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          sx={styles.inputText}
        />
        <FormInputText
          name="position"
          control={control}
          label="Position"
          error={Boolean(errors.position)}
          helperText={errors.position?.message}
          sx={styles.inputText}
        />
        <FormInputText
          name="phoneNumber"
          control={control}
          label="Phone Number"
          error={Boolean(errors.phoneNumber)}
          helperText={errors.phoneNumber?.message}
          sx={styles.inputText}
        />
        <Button
          type="submit"
          variant="contained"
          sx={styles.submitButton}
        >
          Sign Up
        </Button>
        <Link to="/login" style={styles.link}>
          Already registered? Sign in here
        </Link>
      </Form>
    </Stack>
  );
};

export default Register;
