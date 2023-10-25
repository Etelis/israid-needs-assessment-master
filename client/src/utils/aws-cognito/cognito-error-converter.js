const convertCognitoErrorToMessage = (errCode) => {
    const errorMessages = {
      'UsernameExistsException': 'This email is already registered',
      'InvalidParameterException': 'Please fill out all fields correctly',
      'InvalidPasswordException': 'Password does not meet criteria',
      'NotAuthorizedException': 'Incorrect username or password',
      'UserNotConfirmedException': 'Please verify your email',
      'CodeMismatchException': 'Invalid verification code provided, please try again'
    };

    return errorMessages[errCode] || 'An unknown error occurred.';
  }
  
export default convertCognitoErrorToMessage;