import { Navigate, Route, Routes } from "react-router-dom";
import { RNAs } from "./RNAs";
import { Login, Register, ForgotPassword } from "./auth";
import { ProtectedRoutes } from "./ProtectedRoutes";
import QuestionPage from "../components/questions/QuestionPage";
import AddRNA from "./AddRNA";
import CategoriesList from "./CategoriesList";
import ProtectedRouting from './index';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Navigate to="/" replace />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route element={<ProtectedRoutes />}>
      <Route element={<ProtectedRouting />}/>
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;