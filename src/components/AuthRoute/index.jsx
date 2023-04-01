import React from 'react';
import {Navigate} from "react-router";
import {loadUser} from "../../cookie/cookie";
import {useLocation} from "react-router-dom";

const getCurrentRoute = (children, path, user,isLogout=undefined) => {
    if(isLogout)
        return children;
    if (user && user.username) {
        if (path === '/login')
            return <Navigate to="/home"/>;
        else if (path === '/')
            return children;
        else
            return (user.rights.find(right => right === path) ? children : <Navigate to='/home'/>);
    } else {
        if (path === '/login')
            return children
        else
            return <Navigate to='/login'/>;
    }
}

const AuthRoute = (props) => {
    const {
        children,
        path
    } = props;
    const user = loadUser('currentUser');
    const location = useLocation();
    let isLogout = location.state ? location.state.isLogout : false;
    return (
        <>
            {getCurrentRoute(children, path, user, isLogout)}
        </>
    )
}

export default AuthRoute;
