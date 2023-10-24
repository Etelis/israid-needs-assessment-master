const options = {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
	hour: '2-digit',
	minute: '2-digit',
};

const formatDate = (date) => new Date(date).toLocaleString('en-US', options);

export default formatDate;
