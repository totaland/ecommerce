import React, {useState, useEffect, useReducer} from "react";
import Amplify, {Auth, Storage} from "aws-amplify";
import awsmobile from "./aws-exports";
import ResponsiveAppBar from "./navbar/ResponsiveAppBar";
import {BrowserRouter} from "react-router-dom";
import Routes from "./routes/Routes";
import {AppContext} from "./context/AppContext.js";
import Navbar from "./navbar/Navbar";
import {Elements, StripeProvider} from 'react-stripe-elements';
import Payment from './components/Payment';



Amplify.configure(awsmobile);
Storage.configure({level: "private"});


function reducer (state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated2: true

            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated2: false
            };
        case 'ADD':
            return {
                ...state,
                orderDetails: state.orderDetails.concat(action.payload),
                cart: state.cart + 1,
                total: state.total + action.children,
            };
        case 'ADDTOTOTAL':
            return {
                ...state,
                cart: state.cart + 1,
                total: state.total + action.children,
            }
        case 'MINUS':
            return {...state, cart: state.cart -1, total: state.total -1};
        default:
            return state;
    }
}

function App() {

    const initialState = {
        isAuthenticated: false,
    };
    const [state, setState] = useState(initialState);

    const secondInit = {
        isAuthenticated2: false,
        orderDetails: [],
        cart: 0,
        total: 0,
    };

    const [state2, dispatch] = useReducer(reducer, secondInit);

    useEffect( () => {
        async function fetchData() {
            try {
                await Auth.currentAuthenticatedUser();
                dispatch({type: "LOGIN"});
            } catch (e) {
                if (e !== "not authenticated") {
                    alert(e);
                }
            }
        }

        fetchData();
    },[]);

    const userHasAuthenticated = authenticated => {
        setState(state => ({...state, isAuthenticated: authenticated}));
    };

    const signOut = async e => {
        await Auth.signOut();
        // userHasAuthenticated(false);
        dispatch({type: "LOGOUT"});
    };

    return (
        <StripeProvider apiKey ={process.env.REACT_APP_STRIPE_PUBLISHABLE}>
            <Elements>
            <BrowserRouter>
                <AppContext.Provider value={[signOut, state2, dispatch, userHasAuthenticated, state]}>
                <div className="App site">
                    <Navbar />
                    <div className="site-content">
                        <Routes />
                    </div>
                </div>
                </AppContext.Provider>
            </BrowserRouter>
            </Elements>
        </StripeProvider>
    );
}
export default App;