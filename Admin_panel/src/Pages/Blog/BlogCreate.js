import React from 'react';
import jwt_decode from 'jwt-decode';

function BlogCreate() {
    var token = sessionStorage.getItem('Token');
    var decoded = jwt_decode(token);
    console.log(process.env, 'sss');
    console.log(decoded, 'token');
    return <div>{process.env.PUBLIC_URL}</div>;
}

export default BlogCreate;
