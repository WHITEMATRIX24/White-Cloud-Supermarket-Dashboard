import { getAuthenticationToken } from "../utils/checkAuthentication"

function Headers() {
    let token = getAuthenticationToken();
    let headers = {
        "Content-type": "multipart/form-data"
    };
    if(token) {
        headers = {
            "Content-type": "multipart/form-data",
            "Authorization": "Bearer " + token
        }
    }
    return headers;
}

export {
    Headers
}