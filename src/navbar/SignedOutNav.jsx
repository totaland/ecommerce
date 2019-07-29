import React from "react";
import {NavLink} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const style = makeStyles(theme => ({
    li: {
        marginTop: "auto",
        marginBottom: "auto",
        paddingLeft: 15,
        paddingRight: 15
    },
    ul: {
        display: "flex"
    }
}));

function SignedOutNav() {
    const classes = style();
    return (
        <ul className={classes.ul}>
            <li className={classes.li}>
                <NavLink to={"/login"}>Login</NavLink>
            </li>
            <li className={classes.li}>
                <NavLink to={"/register"}>Register</NavLink>
            </li>
        </ul>
    );
}

export default SignedOutNav;
