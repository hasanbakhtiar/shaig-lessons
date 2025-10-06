import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import MainLayout from "../layouts/MainLayout";
import Contact from "../pages/Contact/Contact";
import PrivateRoute from "../../utils/PrivateRoute";
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
        <Route element={<PrivateRoute/>}>
        <Route
          path="/dashboard"
          element={<WithLayout component={Dashboard} />}
        />
        <Route path="/contact" element={<WithLayout component={Contact} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
