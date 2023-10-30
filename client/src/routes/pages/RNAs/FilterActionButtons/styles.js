const button = (isActive) => ({
	flexBasis: '160px',
	height: '50px',
	backgroundColor: (theme) => (isActive ? theme.colors.utility : 'white'),
	color: isActive ? 'white' : 'black',
	borderRadius: '16px',
	border: 'none',
});

export const styles = { button };
