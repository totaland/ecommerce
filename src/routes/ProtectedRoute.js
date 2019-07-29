import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import {AppContext} from "../context/AppContext";

const ProtectedRoute = ({component: Component, ...rest}) => {
    const [isAuthenticated, ...props] = useContext(AppContext);

    return (
        <Route
            {...rest}
            render={props => {
                if (isAuthenticated) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default ProtectedRoute;
