import React, {useContext, useState} from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

import SignedInNav from "./SignedInNav";
import SignedOutNav from "./SignedOutNav";
import SignedInSideNav from "./SignedInSideNav";
import SignedOutSideNav from "./SignedOutSideNav";
import {AppContext} from "../context/AppContext";

const drawerWidth = 240;
const draw = {
    display: "none"
};

const styles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        paddingLeft: "15%",
        paddingRight: "15%",
        height: 64,
        backgroundColor: "#3d3d3d"
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    navbar: {
        height: 150,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ee6e73"
    },

    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    grow: {
        flexGrow: 1
    },
    li: {
        marginTop: "auto",
        marginBottom: "auto",
        padding: 0
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
    toolbar: {
        paddingLeft: 0,
        paddingRight: 0
    }
}));

function ResponsiveDrawer() {
    const classes = styles();
    const [open, setOpen] = React.useState(false);
    const [signOut, state2, dispatch, userHasAuthenticated, state] = useContext(AppContext);

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    // const links = state.isAuthenticated ? (
    const links = state2.isAuthenticated2 ? (
        <SignedInNav style={classes.li}/>
    ) : (
        <SignedOutNav/>
    );

    const sideNavLinks = state.isAuthenticated ? (
        <SignedInSideNav />
    ) : (
        <SignedOutSideNav />
    );

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar className={classes.appBar} position={"static"}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={handleDrawerOpen}
                        className={classes.menuButton}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h4" color="inherit">
                        Uactually
                    </Typography>
                    {/* this help to push the icon to other side of the menu*/}
                    <div className={classes.grow}/>
                    <div className={classes.sectionDesktop}>{links}</div>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} style={draw}>
                <Drawer
                    variant="temporary"
                    anchor={"left"}
                    open={open}
                    onClose={handleDrawerClose}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    {sideNavLinks}
                </Drawer>
            </nav>
        </div>
    );
}

export default ResponsiveDrawer;
