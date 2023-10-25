import { Navigate, Route, Routes } from "react-router";
import { ForgotPassword, Login, Register } from "../auth";

const UnauthenticatedRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default UnauthenticatedRoutes;
