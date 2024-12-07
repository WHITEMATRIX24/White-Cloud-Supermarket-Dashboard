import localStorage from "./localStorage";

function checkAuthentication() {
    let checkUser = localStorage.getData('user-info');
    if(checkUser) {
        return true;
    } 
    return false;
}

function getUserInfo() {
    let checkUser = localStorage.getData('user-info');
    if(checkUser) {
        let { name } = checkUser;
        return {
            name: name
        };
     }
}

function getAuthenticationToken() {
    let checkUser = localStorage.getData('user-info');
    if(checkUser) {
        let { token } = checkUser;
        return token;
     }
}

export {
    getAuthenticationToken, getUserInfo, checkAuthentication
}