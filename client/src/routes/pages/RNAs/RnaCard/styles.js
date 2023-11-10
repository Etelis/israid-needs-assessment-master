const rnaDetails = {
	borderRadius: '16px',
	flexGrow: '1',
};

const rnaCard = (isDownloaded) => ({
	marginBottom: '16px',
	borderRadius: '16px',
	background: isDownloaded
		? 'linear-gradient(to right, #A8FEA6 50%, #A8FEA6 50%)'
		: 'linear-gradient(to right, #A8FEA6 50%, #B4D9FF 50%)',
	border: '1px solid rgba(0, 0, 0, 0.4)',
	width: '100%',
});

const cardButtons = {
	svg: {
		fontSize: '40px',
		color: 'black',
	},
};

const styles = {
	rnaCard,
	rnaDetails,
	cardButtons,
};

export default styles;
