const actionButton = {
  width: '180px',
  height: '60px',
  '& svg': {
    fontSize: '22px !important',
  },
};

const nextButton = (theme, isDisabled) => ({
  height: '60px',
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