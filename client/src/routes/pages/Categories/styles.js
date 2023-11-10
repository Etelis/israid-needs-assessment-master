const rnaCard = {
	borderRadius: '16px',
	border: '1px solid rgba(0, 0, 0, 0.4)',
	width: '90%',
	alignSelf: 'center',
};

const rnaOverview = {
	borderRadius: '16px',
	flexGrow: '1',
	boxShadow: '0 0 2px 1px white',
};

const nextButton = (theme) => ({
	height: '60px',
	color: 'white !important',
	backgroundColor: theme.colors.utility,
	'&:hover': {
		backgroundColor: theme.colors.utility,
	},
	'& svg': {
		fontSize: '22px !important',
	},
});

const prevButton = {
	height: '60px',
	'& svg': {
		fontSize: '22px !important',
	},
};

export default { rnaCard, rnaOverview, nextButton, prevButton };
