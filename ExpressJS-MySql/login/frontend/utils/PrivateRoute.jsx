import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie"

const PrivateRoute = () => {
    const authUserData = () => {
        const cookie = new Cookies(null, { path: '/' });
        const data = cookie.get('login');
        if (data) return true;
        else return false;
    }
    if (authUserData()) {
        return <Outlet />


    } else {
        return <Navigate to={"/login"} />
    }
}

export default PrivateRoute