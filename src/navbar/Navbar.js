import styled from "styled-components";
import React, {useContext, useEffect} from "react";
import {NavLink} from "react-router-dom";
import Avatar from "../components/Avatar";
import {AppContext} from "../context/AppContext";
import SignedInNav from "./SignedInNav";
import SignedOutNav from "./SignedOutNav";
import SignedInSideNav from "./SignedInSideNav";
import SignedOutSideNav from "./SignedOutSideNav";

const Li = styled.li`
	text-decoration: none;
	color: white;
	display: block;
	cursor: pointer;
	font-family: "Roboto", "Helvetica", "Arial", sans-serif;;
`;
const Ul = styled.ul`
	display: flex;
	list-style: none;
	margin:0;
	padding-left: 10%;
	padding-right: 10%;
	background-color: #3C3C3C;
	height: 64px;
	align-items: center;
	border-bottom: solid 4px #797777;
	vertical-align: middle;
`;

const ActiveLi = styled(Li)`
	flex: 1;
	font-size: 2.125em;
	color: white;
`;

export default function LogInNav(props) {

    const [signOut, state2, dispatch, createUser] = useContext(AppContext);

    // const links = state.isAuthenticated ? (
        const links = state2.isAuthenticated2 ? (
        <SignedInNav />
    ) : (
        <SignedOutNav />
    );

    const sideNavLinks = state2.isAuthenticated2 ? (
        <SignedInSideNav />
    ) : (
        <SignedOutSideNav />
    );

    return (
        <div>
            <Ul>
                <ActiveLi>UnderstandU</ActiveLi>
                {links}
            </Ul>

        </div>
    )
}