import React, {useContext, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {Auth} from "aws-amplify";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {AppContext} from "../context/AppContext";

const style = makeStyles(theme => ({
    navbar: {
        height: 100,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#3d3d3d",
        paddingLeft: 16,
        paddingRight: 16,
        color: "white",
        fontSize: "1em"
        // paddingTop: 24,
    },
    username: {
        paddingTop: 24
    },
    email: {
        paddingBottom: 16
    },
    link: {
        paddingTop: 0,
        paddingBottom: 0,
        display: "block",
        paddingLeft: 0,
        paddingRight: 0
    }
}));

function SignedInSideNav () {

    const [signOut, state2, dispatch,createUser] = useContext(AppContext);
    const InitialSignInState = {
        userName: "",
        email: ""
    };
    const [signInState, setSignInState] = useState(InitialSignInState);
    const setUserInfo = async () => {
        let userName = "";
        let email = "";
        await Auth.currentUserInfo().then(res => {
            userName = res.username;
            email = res.attributes.email;
        });
        setSignInState({
            userName: userName,
            email: email
        });
    };

    useEffect(() => {
        setUserInfo();
    },[]);


    const classes = style();

    return (
        <div>
            <div className={classes.navbar}>
                <span className={classes.username}>{signInState.userName}</span>
                <span className={classes.email}>{signInState.email}</span>
            </div>
            <Divider/>
            <List className={"link"}>
                <ListItem className={classes.link}>
                    <NavLink to={"/"}>Home</NavLink>
                </ListItem>
                <ListItem className={classes.link}>
                    <NavLink to={"/support"}>Support</NavLink>
                </ListItem>
                <ListItem className={classes.link}>
                    <NavLink to={"#"} onClick={signOut}>Log Out</NavLink>
                </ListItem>
            </List>
            <hr/>
        </div>
    );
}


export default SignedInSideNav;
