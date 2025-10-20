import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import EnterPage from "./pages/dashboard/EnterPage";
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <EnterPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App