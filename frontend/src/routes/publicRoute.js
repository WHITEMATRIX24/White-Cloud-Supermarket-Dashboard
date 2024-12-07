import { Navigate } from "react-router-dom";
import { checkAuthentication } from "../utils/checkAuthentication"

export const PublicRoute = ({ children }) => {
    let checkUser = checkAuthentication();
    if(!checkUser) {
        return children;
    }
    return <Navigate to={'/'} />
}