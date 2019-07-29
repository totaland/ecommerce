import React from "react";
import {NavLink} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";

const style = theme => ({
    li: {
        marginLeft: 10
    }
});

class SignedOutSideNav extends React.Component {
    render() {
        return (
            <div className={"link"}>
                <li>
                    <NavLink to={"/register"}>Register</NavLink>
                </li>
                <li>
                    <NavLink to={"/login"}>Login</NavLink>
                </li>
                <hr/>
            </div>
        );
    }
}

export default withStyles(style)(SignedOutSideNav);
