import React, {useState, useEffect, useReducer} from "react";
import Amplify, {API, Auth, Storage, graphqlOperation} from "aws-amplify";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";
import awsmobile from "./aws-exports";
import ResponsiveAppBar from "./navbar/ResponsiveAppBar";
import {BrowserRouter} from "react-router-dom";
import Routes from "./routes/Routes";
import {AppContext} from "./context/AppContext.js";
import Navbar from "./navbar/Navbar";
import {Elements, StripeProvider} from "react-stripe-elements";

Amplify.configure(awsmobile);
Storage.configure({level: "private"});

function reducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isAuthenticated2: true
            };
        case "LOGOUT":
            return {
                ...state,
                isAuthenticated2: false
            };
        case "ADD":
            return {
                ...state,
                orderDetails: state.orderDetails.concat(action.payload),
                cart: state.cart + 1,
                total: state.total + action.children
            };
        case "ADDTOTOTAL":
            return {
                ...state,
                cart: state.cart + 1,
                total: state.total + action.children
            };
        case "MINUS":
            return {...state, cart: state.cart - 1, total: state.total - 1};
        case "COMPLETE":
            return {...state, complete: true};
        case "UNCOMPLETE":
            return {...state, complete: false};
        case "SETUSER":
            return {
                ...state,
                username: action.username,
                userId: action.userId,
                email: action.email,
                phone: action.phone
            };
        case "SETTOKEN":
            return {
                ...state,
                tokenId: action.tokenId
            };
        case "SETBASKET":
            return {
                ...state,
                basketId: action.basketId
            };
        case "CHECKSTATE":
            return {
                ...state
            }
        default:
            return state;
    }
}



function App() {
    // initialize all the value
    const secondInit = {
        isAuthenticated2: false,
        orderDetails: [],
        cart: 0,
        total: 0,
        complete: false,
        username: "",
        userId: "",
        email: "",
        phone: "",
        tokenId: "",
        basketId: "",
        description: ""
    };

    const [state2, dispatch] = useReducer(reducer, secondInit);

    // checking if user are log in or not
    useEffect(() => {
        async function fetchData() {
            try {
                await Auth.currentAuthenticatedUser()
                    .then(user => {
                        console.log(user);
                        // set the user
                        dispatch({
                            type: "SETUSER",
                            username: user.username,
                            userId: user.pool.clientId,
                            email: user.attributes.email,
                            phone: user.attributes.phone_number
                        });
                        dispatch({type: "LOGIN"});
                    })
                    .catch(e => {
                        console.log(e);
                    });

            } catch (e) {
                if (e !== "not authenticated") {
                    alert(e);
                }
            }
        }

        fetchData();
    }, [state2.basketId]);

    const userDetails = {
        id: state2.userId,
        name: state2.username,
        email: state2.email
    };

    // create user
    const createUser = async () => {
        await API.graphql(
            graphqlOperation(mutations.createUser, {input: userDetails})
        );
    };
    // create basket
    let basketDetails;
    const createBasket = async token => {
        await API.graphql(graphqlOperation(queries.getUser, {id: state2.userId})).then(async res => {
            console.log(res);
            let id = String(res.data.getUser.baskets.items.length) + "-" + state2.userId;
            let id2 = String(0) + "-" + state2.userId;
            let id3;
            if (res.data.getUser.baskets.items.length >= 1) {
                id3= id;
            } else {
                id3 = id2;
            }
            await dispatch({
                type: "SETBASKET",
                basketId: id3
            });

            basketDetails = {
                isPaid: false,
                id: id3,
                stripeToken: token,
                basketUserId: state2.userId
            };
            try{
                await API.graphql(
                  graphqlOperation(mutations.createBasket, {input: basketDetails})
                );
            } catch (e) {
                console.log(e);
            }
            createItem(id3);
        });
    };
    // create items
    const createItem = async (id3) => {
        console.log(state2.orderDetails);
        let products = state2.orderDetails;
        for(let i =0; i<products.length; i++) {
            let itemDetails = {
                id: products[i].id + "-"+ id3,
                name: products[i].name,
                price: parseFloat(products[i].price.split("$")[1]),
                itemBasketId: id3,
                time: products[i].time
            };
            await API.graphql(graphqlOperation(mutations.createItem, {input: itemDetails}));
            await API.graphql(graphqlOperation(queries.getUser, {id: state2.userId})).then(async res => {
                console.log(res);
            })
            await API.graphql(graphqlOperation(queries.listItems, {limit: 50})).then(async res => {
                console.log(res);
            })
        }
    };
    // sign user out of the application
    const signOut = async e => {
        await Auth.signOut();
        dispatch({type: "LOGOUT"});
    };

    return (
        <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLISHABLE}>
            <Elements>
                <BrowserRouter>
                    <AppContext.Provider
                        value={[signOut, state2, dispatch, createUser, createBasket, createItem]}
                    >
                        <div className="App site">
                            <Navbar/>
                            <div className="site-content">
                                <Routes/>
                            </div>
                        </div>
                    </AppContext.Provider>
                </BrowserRouter>
            </Elements>
        </StripeProvider>
    );
}

export default App;
