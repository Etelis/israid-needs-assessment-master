const defaultProgressCard = {
	borderRadius: '16px',
	flexGrow: '1',
	boxShadow: '0 0 2px 1px white',
};

const progressCardContent = {
	'&:last-child': {
		paddingBottom: '16px',
	},
};

const rnaCard = {
	marginTop: '16px',
	marginBottom: '16px',
	borderRadius: '16px',
	background: 'linear-gradient(to right, #A8FEA6 50%, #B4D9FF 50%)',
	border: '1px solid rgba(0, 0, 0, 0.4)',
	width: '100%',
};

const cardButtons = {
	'svg': {
		fontSize: '40px',
		color: 'black',
	},
};

const styles = {
	rnaCard,
	defaultProgressCard,
	progressCardContent,
	cardButtons,
};

export default styles;
