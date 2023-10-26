import axios from 'axios';

export const api = axios.create({
	baseURL:
		import.meta.env.VITE_NODE_ENV === 'production'
			? import.meta.env.VITE_API_URL
			: 'http://localhost:3000/api',
	headers: {
		'Content-type': 'application/json',
		Accept: 'application/json',
	},
});
