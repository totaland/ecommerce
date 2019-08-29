import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function querystring(name, url = window.location.href) {
  name = name.replace(/[[]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  const results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const UnauthenticatedRoute = ({ component: C, ...rest }) => {
  const [signOut, state2, dispatch, createUser] = useContext(AppContext);

  const redirect = querystring("redirect");
  return (
    <Route
      {...rest}
      render={props =>
        // !state.isAuthenticated ? (
        !state2.isAuthenticated2 ? (
          <C {...props} />
        ) : (
          <Redirect
            to={redirect === "" || redirect === null ? "/" : redirect}
          />
        )
      }
    />
  );
};
export default UnauthenticatedRoute;
