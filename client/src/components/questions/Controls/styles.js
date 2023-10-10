const actionButton = {
  width: '120px',
  height: '50px',
  '& svg': {
    fontSize: '22px !important',
  },
};

const nextButton = (theme, isDisabled) => ({
  color: !isDisabled && 'white !important',
  backgroundColor: !isDisabled && theme.colors.utility,
  '&:hover': {
    backgroundColor: !isDisabled && theme.colors.utility,
  },
  '& svg': {
    fontSize: '22px !important',
  },
});
const styles = { actionButton, nextButton };

export default styles;
