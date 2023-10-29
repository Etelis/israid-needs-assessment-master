import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Alert, Typography, Box } from "@mui/material";
import { Save } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import userPool from "../../../../cognito-config";
import convertCognitoErrorToMessage from "../../../utils/aws-cognito/cognito-error-converter";
import { useUser } from "../../../contexts/UserContext";
import { Form, FormInputText } from "../../../components/Form";
import validationSchema from "./validationSchema";
import styles from "./styles";

const UpdatePersonalDetails = () => {
  const { user, setUser } = useUser();
  const [error, setError] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      position: user.position,
      phoneNumber: user.phoneNumber,
    },
  });

  const onSubmit = (data) => {
    const { name, email, position, phoneNumber } = data;

    const attributeList = [
      new CognitoUserAttribute({ Name: "name", Value: name }),
      new CognitoUserAttribute({ Name: "email", Value: email }),
      new CognitoUserAttribute({ Name: "custom:position", Value: position }),
      new CognitoUserAttribute({ Name: "phone_number", Value: phoneNumber }),
    ];

    const currentUser = userPool.getCurrentUser();

    if (currentUser === null) {
      setError("User not authenticated");

      return;
    }

    currentUser.getSession((err, session) => {
      if (err) {
        setError(convertCognitoErrorToMessage(err.code));
        return;
      }

      if (!session.isValid()) {
        setError("Invalid session");

        return;
      }

      currentUser.updateAttributes(attributeList, (err) => {
        if (err) {
          setError(convertCognitoErrorToMessage(err.code));
          return;
        }

        setUser({ ...data, emailVerified: true });
        toast.success("Details were update succefully!", {
          toastId: "updateAttributesSuccess",
        });
      });
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert severity="error" sx={styles.alert}>
          {error}
        </Alert>
      )}
      <Typography variant="h6" fontWeight="bold" fontSize="2.5rem">
        Personal Details
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center">
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
      </Box>
      <Button type="submit" sx={styles.updateButton} startIcon={<Save />}>
        Save
      </Button>
    </Form>
  );
};

export default UpdatePersonalDetails;
