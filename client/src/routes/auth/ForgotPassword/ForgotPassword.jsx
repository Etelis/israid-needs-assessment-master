import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CognitoUser } from "amazon-cognito-identity-js";
import userPool from "../../../../cognito-config";
import convertCognitoErrorToMessage from "../../../utils/aws-cognito/cognito-error-converter";
import { Form, FormInputText } from "../../../components/Form";
import {
  step1validationSchema,
  step2validationSchema,
} from "./validationSchemas";
import { IsraaidLogo } from "../components/IsraaidLogo";
import styles from "./styles";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [emailValue, setEmailValue] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      step === 1 ? step1validationSchema : step2validationSchema
    ),
    defaultValues: {
      email: "",
      confirmationCode: "",
      newPassword: "",
    },
  });

  const onSubmit = (data) => {
    if (step === 1) {
      setEmailValue(data.email);
      handleForgotPassword(data.email);
    } else if (step === 2) {
      handleNewPassword(emailValue, data.confirmationCode, data.newPassword);
    }
  };

  const handleForgotPassword = (email) => {
    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.forgotPassword({
      onSuccess: () => {
        setStep(2);
      },
      onFailure: (err) => {
        setError(convertCognitoErrorToMessage(err.code));
      },
    });
  };

  const handleNewPassword = (email, confirmationCode, newPassword) => {
    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmPassword(confirmationCode, newPassword, {
      onSuccess: () => {
        alert("Password successfully changed");
        navigate("/login");
      },
      onFailure: (err) => {
        setError(convertCognitoErrorToMessage(err.code));
      },
    });
  };

  return (
    <>
      <IsraaidLogo />
      <Typography variant="h5" sx={styles.title}>
        Forgot Password
      </Typography>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        sx={styles.container}
      >
        {error && (
          <Alert severity="error" sx={styles.errorAlert}>
            {error}
          </Alert>
        )}
        {step === 1 && (
          <FormInputText
            name="email"
            control={control}
            label="Email"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            sx={styles.formInputText}
          />
        )}
        {step === 2 && (
          <>
            <FormInputText
              name="confirmationCode"
              control={control}
              label="Confirmation Code"
              error={Boolean(errors.confirmationCode)}
              helperText={errors.confirmationCode?.message}
              sx={styles.formInputText}
            />
            <FormInputText
              name="newPassword"
              control={control}
              label="New Password"
              type="password"
              error={Boolean(errors.newPassword)}
              helperText={errors.newPassword?.message}
              sx={styles.formInputText}
            />
          </>
        )}
        <Button
          type="submit"
          variant="contained"
          sx={styles.submitButton}
        >
          {step === 1 ? "Send Reset Code" : "Confirm New Password"}
        </Button>
      </Form>
    </>
  );
};

export default ForgotPassword;
