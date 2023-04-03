import React from "react";

import { Route, Redirect } from 'react-router-dom';

import { useAuth } from "../contexts/Auth";

export function PrivateRoute({ component: Component, ...rest }) {
    const { session } = useAuth();
    // console.log(session);
    return (
        <Route
            {...rest}
            render={(props) => {
                return session ? <Component {...props} /> : <Redirect to="/login" />
            }}
        ></Route>
    );
}