import React from "react";
import {withRouter} from "react-router-dom";
import GetAccessToken from "../components/GetAccessToken";

const GetAccess = props => {
    return <GetAccessToken props={props}/>;
};

export default withRouter(GetAccess);
