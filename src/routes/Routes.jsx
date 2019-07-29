import React from "react";
import {Switch} from "react-router-dom";
import SignInFormik from "./SignInFormik";
import RegisterFormik from "./RegisterFormik";
import IBM from "../components/IBM";

import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";

export default ({childProps}) => (
    <Switch>
        <AuthenticatedRoute path="/" exact component={IBM} props={childProps}/>
        <UnauthenticatedRoute path="/login" exact component={SignInFormik}/>
        <UnauthenticatedRoute path="/register" exact component={RegisterFormik}/>
        {/*<UnauthenticatedRoute path="/login" exact component={SignInForm} props={childProps}/>*/}
        {/*<UnauthenticatedRoute path="/register" exact component={SignUpForm1}/>*/}
        {/* Finally, catch all unmatched routes */}
        {/*<Route component={NotFound} />*/}
    </Switch>
);
