import 'react-toastify/dist/ReactToastify.css';

import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { del, get, set } from 'idb-keyval';
import { MemoryRouter as Router } from 'react-router-dom';

import { Navbar } from './components/Navbar/Navbar';
import Routes from './routes';
import { ThemeProvider } from './theme';
import { ToastContainer, toast } from 'react-toastify';
import { NavbarButtonsProvider } from './components/Navbar/useNavbarButtonsContext';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: Infinity,
			staleTime: Infinity,
			onError: () => {
				toast.error('Woops Somethings Went Wrong');
			},
		},
		mutations: {
			onError: () => {
				toast.error('Woops Somethings Went Wrong');
			},
		},
	},
});

const createIDBPersister = (
	idbValidKey = import.meta.env.VITE_REACT_QUERY_KEY
) => ({
	persistClient: async (client) => {
		set(idbValidKey, client);
	},
	restoreClient: async () => {
		return await get(idbValidKey);
	},
	removeClient: async () => {
		await del(idbValidKey);
	},
});

const persister = createIDBPersister();

const App = () => (
	<PersistQueryClientProvider
		client={queryClient}
		persistOptions={{ persister }}
	>
		<ThemeProvider>
			<Router>
				<NavbarButtonsProvider>
					<Navbar />
					<Routes />
				</NavbarButtonsProvider>
			</Router>
			<ToastContainer
				position='bottom-right'
				autoClose={2000}
				closeOnClick
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover
				theme='colored'
			/>
		</ThemeProvider>
	</PersistQueryClientProvider>
);

export default App;
