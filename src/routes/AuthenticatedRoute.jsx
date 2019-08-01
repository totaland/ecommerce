import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const AuthenticatedRoute = ({ component: C, ...rest }) => {
  const [signOut, state2, dispatch] = useContext(AppContext);

  return (
    <Route
      {...rest}
      render={props =>
        state2.isAuthenticated2 ? (
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
