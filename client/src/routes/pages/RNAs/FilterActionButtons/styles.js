const button = (isActive) => ({
	flexBasis: '240px',
	height: '70px',
	backgroundColor: (theme) => (isActive ? theme.colors.utility : 'white'),
	color: isActive ? 'white' : 'black',
	padding: '12px 24px',
	borderRadius: '16px',
	border: 'none',
	fontSize: '16px',
});

export const styles = { button };
