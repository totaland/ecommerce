import React, {useContext, useEffect} from "react";
import {NavLink} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

import {AppContext} from "../context/AppContext";
import Avatar from "../components/Avatar"
import {ShoppingBasket} from "styled-icons/material/ShoppingBasket"
import styled from "styled-components";

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

const Icon = styled(ShoppingBasket)`
  width: 30px;
  &:after {
    content: "🦄";
    font-size:12px;
    background: red;
    border-radius:50%;
    padding:3px;
    position:relative;
    left:-8px;
    top:-10px;
    opacity:0.8;
  }
`;


function SignedInNav() {
    const [signOut, state2, dispatch] = useContext(AppContext);
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
                <NavLink to={"/shoppingbasket"}><Icon value={5} /></NavLink>
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
