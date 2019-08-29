import React, {useContext, useEffect} from "react";
import {NavLink} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import styled from "styled-components";

import {AppContext} from "../context/AppContext";
import Avatar from "../components/Avatar"
import {ShoppingBasket} from "styled-icons/material/ShoppingBasket"
import ICON from "../components/Icon"

const style = makeStyles(theme => ({
    li: {
        marginTop: "auto",
        marginBottom: "auto",
        paddingLeft: 15,
        paddingRight: 15
    },
    ul: {
        display: "flex",
        textDecoration: "none"
    }
}));



function SignedInNav() {
    const [signOut, state2, dispatch, createUser] = useContext(AppContext);
    const classes = style();
    return (
        <ul className={classes.ul}>
            <li className={classes.li}>
                <NavLink to={"/"}>Products</NavLink>
            </li>
            <li className={classes.li}>
                <NavLink to={"/profile"}><Avatar src={'/images/lady.jfif'} size={"40px"}/></NavLink>
            </li>
            <li className={classes.li}>
                <NavLink to={"/shoppingbasket"}><ICON>{state2.cart}</ICON></NavLink>
            </li>

            <li className={classes.li}>
                <NavLink to={"#"} onClick={signOut}>
                    Log Out
                </NavLink>
            </li>
        </ul>
    );
}

export default SignedInNav;
