import React from "react";
import {Switch} from "react-router-dom";
import SignInFormik from "./SignInFormik";
import RegisterFormik from "./RegisterFormik";
import IBM from "../components/Products";
import Payment from '../components/Payment';
import Charge from '../components/Charge'

import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";

export default ({childProps}) => (
    <Switch>
        <AuthenticatedRoute path="/" exact component={IBM} props={childProps}/>
        <AuthenticatedRoute path="/shoppingbasket" exact component={Payment} props={childProps}/>
        <AuthenticatedRoute path="/charge" exact component={Charge} />
        <UnauthenticatedRoute path="/login" exact component={SignInFormik}/>
        <UnauthenticatedRoute path="/register" exact component={RegisterFormik}/>
        {/* Finally, catch all unmatched routes */}
        {/*<Route component={NotFound} />*/}
    </Switch>
);
