import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import MainLayout from "../layouts/MainLayout";
import Contact from "../pages/Contact/Contact";
import ProtectedRoute from "./ProtectRoute";
// Wrap component with MainLayout
const WithLayout = ({ component: Component }) => {
  return (
    <MainLayout>
      <Component />
    </MainLayout>
  );
};


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute><WithLayout component={Dashboard} /></ProtectedRoute>}
        />
        <Route path="/contact" element={<ProtectedRoute><WithLayout component={Contact} /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;




