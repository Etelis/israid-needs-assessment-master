import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { del, get, set } from "idb-keyval";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";

import store from "./redux/store";
import { Navbar } from "./components/Navbar/Navbar";
import Routes from "./routes";
import { ThemeProvider } from "./theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
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
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Navbar />
          <Routes />
        </Router>
      </ThemeProvider>
    </Provider>
  </PersistQueryClientProvider>
);

export default App;
