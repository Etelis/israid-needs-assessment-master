import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Box, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import jwt_decode from "jwt-decode";
import convertCognitoErrorToMessage from "../../../utils/aws-cognito/cognito-error-converter";
import userPool from "../../../../cognito-config";
import { useUser } from "../../../contexts/UserContext";
import { Form, FormInputText } from "../../../components/Form";
import { IsraaidLogo } from "../components/IsraaidLogo";
import ConcaveGradient from "../components/ConcaveGradient/ConcaveGradient";
import validationSchema from "./validationSchema";
import styles from "./styles";

const Login = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { user, setUser } = useUser();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      navigate("/RNAs");
    }
  }, [user, navigate]);

  const onSubmit = (data) => {
    const { email, password } = data;

    const authenticationData = {
      Username: email,
      Password: password,
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        const idToken = session.getIdToken().getJwtToken();
        const decodedToken = jwt_decode(idToken);
        const {
          name,
          email,
          ["custom:position"]: position,
          phone_number: phoneNumber,
        } = decodedToken;

        setUser({ name, email, position, phoneNumber });
        navigate("/RNAs");
      },
      onFailure: (err) => {
        setError(convertCognitoErrorToMessage(err.code));
      },
    });
  };

  return (
    <>
      <IsraaidLogo />
      <Form onSubmit={handleSubmit(onSubmit)} sx={styles.form}>
        {error && (
          <Alert severity="error" sx={styles.alert}>
            {error}
          </Alert>
        )}
        <FormInputText
          name="email"
          control={control}
          label="Enter Email"
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          sx={styles.inputText}
        />
        <FormInputText
          name="password"
          control={control}
          label="Enter Password"
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          sx={styles.inputText}
        />
        <Button type="submit" variant="contained" sx={styles.submitButton}>
          Log In
        </Button>
        <Link to="/forgot-password" style={styles.link}>
          Forgot Password? Reset here
        </Link>
        <Link to="/register" style={styles.link}>
          Don't have an account? Register here
        </Link>
      </Form>
      <ConcaveGradient />
    </>
  );
};

export default Login;
