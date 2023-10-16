const answerButton = (theme, isSelected, selectedColor) => {
  return {
    color: isSelected && theme.colors.selectedText,
    width: '170px',
    height: '60px',
    backgroundColor: isSelected && selectedColor,
    '&:hover': {
      backgroundColor: isSelected && selectedColor,
    },
  };
};

const styles = { answerButton };

export default styles;
