import "react-toastify/dist/ReactToastify.css";
import { del, get, set } from "idb-keyval";
import { MemoryRouter as Router } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { UserProvider } from "./contexts/UserContext";
import AppRoutes from "./routes";
import { ToastContainer, toast } from "react-toastify";
import { NavbarButtonsProvider } from "./components/Navbar/useNavbarButtonsContext";
import { QueryClient } from "@tanstack/query-core";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ThemeProvider } from "./theme";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      staleTime: Infinity,
      onError: () => {
        const errorMessage = "Woops Somethings Went Wrong";

        toast.error(errorMessage, { toastId: errorMessage });
      },
    },
    mutations: {
      onError: () => {
        const errorMessage = "Woops Somethings Went Wrong";

        toast.error(errorMessage, { toastId: errorMessage });
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
      <UserProvider>
        <Router>
          <NavbarButtonsProvider>
            <Navbar />
            <AppRoutes />
          </NavbarButtonsProvider>
        </Router>
      </UserProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />
    </ThemeProvider>
  </PersistQueryClientProvider>
);

export default App;