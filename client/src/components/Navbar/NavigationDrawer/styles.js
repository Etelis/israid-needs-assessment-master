const navLink = {
	textDecoration: 'none',
};

const navList = {
	minWidth: '280px',
	'li': {
		color: 'black',
		background: '#f0f0f0',
	},

	'li:hover': {
		color: 'white',
		background: 'white',
	},

	'.active li': {
		color: 'white',
		background:  theme => theme.colors.utility,
	},

};

const drawer = {
	zIndex: 1,
	'.MuiPaper-root': {
		background: '#f0f0f0',
	}
};

const navigationIcon = {
	minWidth: '50px',
	fontSize: '30px',
};

export default { navLink, navList, drawer, navigationIcon };
