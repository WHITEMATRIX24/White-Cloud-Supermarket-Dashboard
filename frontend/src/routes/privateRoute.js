import { Navigate } from "react-router-dom";
import { checkAuthentication } from "../utils/checkAuthentication"

export const PrivateRoute = ({ children }) => {
    let checkUser = checkAuthentication();
    if(!checkUser) {
        return <Navigate to={'/signin'} />
    }
    return children;
}