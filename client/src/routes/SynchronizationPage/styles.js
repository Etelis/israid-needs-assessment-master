const progressBar = {
	color: (theme) => theme.colors.utility,
	height: 10,
	borderRadius: 5,
	'&.MuiLinearProgress-root': {
		borderRadius: '5px',
	},
};

const syncButton = {
	color: (theme) => theme.colors.selectedText,
	backgroundColor: (theme) => theme.colors.utility,
	height: '60px',
	width: '60%',
};

const styles = { progressBar, syncButton };

export default styles;