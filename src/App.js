import React, {useState, useEffect, useReducer} from "react";
import Amplify, {Auth, Storage} from "aws-amplify";
import awsmobile from "./aws-exports";
import ResponsiveAppBar from "./navbar/ResponsiveAppBar";
import {BrowserRouter} from "react-router-dom";
import Routes from "./routes/Routes";
import {AppContext} from "./context/AppContext.js";

Amplify.configure(awsmobile);
Storage.configure({level: "private"});


function reducer (state, action) {
    switch (action.type) {
        case 'ADD':
            return {
                orderDetails2: state.orderDetails2.concat(action.payload),
                cart2: state.cart2 + 1,
                total2: state.total2 + action.children,
            };
        case 'MINUS':
            return {...state, cart2: state.cart2 -1, total2: state.total2 -1};
        default:
            return state;
    }
}

function App() {

    const initialState = {
        isAuthenticated: false,
        isAuthenticating: true,
        candidateId: "",
        userID: "",
        candidateArray: [],
        candidateUrl: [],
        orderDetails: [],
        cart: 0,
        total: 0,
    };
    const [state, setState] = useState(initialState);

    const secondInit = {
        orderDetails2: [],
        cart2: 0,
        total2: 0,
    }

    const [state2, dispatch] = useReducer(reducer, secondInit);

    useEffect( () => {
        const fetchData = async () => {
            await getUserInfo();
            try {
                await Auth.currentAuthenticatedUser().then(res => {
                });
                userHasAuthenticated(true);
            } catch (e) {
                if (e !== "not authenticated") {
                    alert(e);
                }
            }
            setState(state => ({...state, isAuthenticating: false}))
        };
        fetchData();
    },[]);


    // get current user information ####################################
    const getUserInfo = async () => {
        try {
            let id = "";
            await Auth.currentUserInfo().then(res => {
                id = res.id;
                setState(state => ({
                    ...state,
                    userID: id
                }));
            });
        } catch (e) {
            console.log(e);
        }
    };

    const userHasAuthenticated = authenticated => {
        setState(state => ({...state, isAuthenticated: authenticated}));
    };

    const signOut = async e => {
        await Auth.signOut();
        userHasAuthenticated(false);
        setState(state => ({
            ...state,
            // profileUrl: ""
        }));
    };
    const candidateID = id => {
        setState(state => ({
            ...state,
            candidateId: id
        }));
    };
    return (
            <BrowserRouter>
                <AppContext.Provider value={[getUserInfo, signOut, candidateID, userHasAuthenticated, state, setState, state2, dispatch]}>
                <div className="App site">
                    <ResponsiveAppBar />
                    <div className="site-content">
                        <div className={"container"}>
                            <Routes />
                        </div>
                    </div>
                </div>
                </AppContext.Provider>
            </BrowserRouter>
    );
}
export default App;