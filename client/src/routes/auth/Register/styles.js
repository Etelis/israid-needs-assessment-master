import authStyles from '../utils/authStyles';

const signUp = {
  ...authStyles.submitButton, 
  backgroundColor: 'orange'
};

const styles = {
  ...authStyles,
  submitButton: signUp
};

export default styles;
