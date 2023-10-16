const selectOption = (isSelected) => ({
	display: 'flex',
	width: 1,
	height: 1,
	backgroundColor: isSelected && '#B9B9B9',
	'&:hover': {
		backgroundColor: isSelected && '#B9B9B9',
	},
});

const styles = { selectOption };

export default styles;
