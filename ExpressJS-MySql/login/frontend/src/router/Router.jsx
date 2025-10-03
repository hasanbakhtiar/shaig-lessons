import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import MainLayout from "../layouts/MainLayout";
import Contact from "../pages/Contact/Contact";
// Wrap component with MainLayout
const WithLayout = ({ component: Component }) => {
  return (
    <MainLayout>
      <Component />
    </MainLayout>
  );
};

const AppContent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={<WithLayout component={Dashboard} />}
        />
        <Route path="/contact" element={<WithLayout component={Contact} />} />
      </Routes>
    </>
  );
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default AppRouter;
