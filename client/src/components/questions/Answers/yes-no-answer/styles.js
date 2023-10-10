const answerButton = (theme, isSelected) => {
  return {
    color: isSelected && theme.colors.selectedText,
    width: '170px',
    height: '60px',
    backgroundColor: isSelected && theme.colors.selected,
    '&:hover': {
      backgroundColor: isSelected && theme.colors.selected,
    },
    span: isSelected && {
      border: `3px solid ${theme.colors.selectedBorder}`,
    },
  };
};

const styles = { answerButton };

export default styles;
