import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../contexts/UserContext"; 

const ProtectedRoutes = ({ children }) => {
  const { user } = useUser();
  console.log('user', user  )

  if (user) {
    return children ? children : <Outlet />;
}

  return <Navigate to="/login" replace/>;
};

export default ProtectedRoutes;