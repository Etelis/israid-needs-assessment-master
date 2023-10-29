import { Route, Routes } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { AuthenticatedRoutes } from "./AuthenticatedRoutes";
import { UnauthenticatedRoutes } from "./UnauthenticatedRoutes";

const AppRoutes = () => {
  const { user } = useUser();

  return (
    <Routes>
      <Route
        path="/*"
        element={user?.emailVerified ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
      />
    </Routes>
  );
};

export default AppRoutes;