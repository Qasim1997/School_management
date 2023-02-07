import React from 'react';
import { Navigate, useOutlet } from 'react-router-dom';

const Protected = (props) => {
    const loggedIn = window.sessionStorage.getItem('token');
    const outlet = useOutlet();
    if (!loggedIn) {
        return <Navigate to="/login" />;
    }
    return <div>{outlet}</div>;
};
export default Protected;
