

export function isLogged() {
    return localStorage.getItem('user_logged_cal') != null;
}

export function loginUser(user) {
    localStorage.setItem('user_logged_cal', user);
}

export function logoutUser() {
    localStorage.removeItem('user_logged_cal');
}

export function getInfoUserLogged() {
    const info = localStorage.getItem('user_logged_cal');
    const authInfo = convertArrayToObject(JSON.parse(info));
    console.log(authInfo);
    return authInfo === undefined ? {} : authInfo;

}

const convertArrayToObject = (array) => {
    let object = {};
    if(!Array.isArray(array)){
        logoutUser();
        return ;
    }
    array.map((item) => {
        const key = item[0];
        const value = item[1];
        return object[key] = value;
    })
    return object;
};