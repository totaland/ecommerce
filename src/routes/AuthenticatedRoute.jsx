import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import {AppContext} from "../context/AppContext";

const AuthenticatedRoute = ({component: C, ...rest}) => {
    const [getUserInfo, signOut, candidateID, userHasAuthenticated, state, setState] = useContext(AppContext);

    return (
        <Route
            {...rest}
            render={props =>
                state.isAuthenticated ? (
                    <C {...props} />
                ) : (
                    <Redirect
                        to={`/login?redirect=${props.location.pathname}${props.location.search}`}
                    />
                )
            }
        />
    );
};

export default AuthenticatedRoute;
