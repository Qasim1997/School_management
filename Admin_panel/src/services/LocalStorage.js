const storeToken = (value) => {
    sessionStorage.setItem('Token', value);
};
const getToken = () => {
    let token = sessionStorage.getItem('Token');
    return token;
};
const getId = () => {
    let getid = sessionStorage.getItem('teacher_id');
    return getid;
};
const getusertype = () => {
    let getid = sessionStorage.getItem('user_type');
    return getid;
};
const removeToken = (value) => {
    sessionStorage.removeItem(value);
};

export { storeToken, getToken, removeToken, getId, getusertype };
