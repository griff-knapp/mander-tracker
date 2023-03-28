import React from "react";

import { Route, Redirect } from 'react-router-dom';

import { useAuth } from "../contexts/Auth";

export function PrivateRoute({ component: Component, ...rest }) {
    const { user, session } = useAuth();
    console.log(session);
    return (
        <Route
            {...rest}
            render={(props) => {
                return user !== null ? <Component {...props} /> : <Redirect to="/login" />
            }}
        ></Route>
    );
}