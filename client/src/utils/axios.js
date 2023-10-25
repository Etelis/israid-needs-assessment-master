import axios from 'axios';

export const api = axios.create({
	baseURL:
		import.meta.env.VITE_NODE_ENV === 'production'
			? 'https://dom6b8ltd7.execute-api.eu-north-1.amazonaws.com/IsraAid'
			: 'http://localhost:3000/api',
	headers: {
		'Content-type': 'application/json',
		Accept: 'application/json',
	},
});
