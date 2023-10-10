const selectOption = (theme, isSelected) => {
  return {
    display: 'flex',
    color: isSelected && theme.colors.selectedText,
    width: 1,
    height: 1,
    backgroundColor: isSelected && theme.colors.selected,
    '&:hover': {
      backgroundColor: isSelected && theme.colors.selected,
    },
  };
};

const styles = { selectOption };

export default styles;
