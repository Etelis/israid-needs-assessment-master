const questionBox = {
	margin: 2,
	padding: 1,
	textAlign: 'center',
	borderRadius: '5px',
	border: '1px solid gray',
};

const notesBox = {
	padding: 2,
	'& label': {
		py: 2,
		px: '21px',
	},
};

const progressSummary = {
	py: 1,
	px: 5,
	boxShadow: '0px 0px 0px 6px lightgrey',
	borderRadius: '16px',
};

const styles = { questionBox, notesBox, progressSummary };

export default styles;
