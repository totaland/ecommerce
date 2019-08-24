import React, {useState, useEffect} from "react";
import Amplify, {Auth, Storage} from "aws-amplify";
// import awsmobile from "./aws-exports";
import ResponsiveAppBar from "./navbar/ResponsiveAppBar";
import {BrowserRouter} from "react-router-dom";
import Routes from "./routes/Routes";
import {AppContext} from "./context/AppContext.js";

// Amplify.configure(awsmobile);
// Storage.configure({level: "private"});

function App() {

    const initialState = {
        isAuthenticated: false,
        isAuthenticating: true,
        candidateId: "",
        userID: "",
        candidateArray: [],
        candidateUrl: []
    };
    const [state, setState] = useState(initialState);

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
            setState({isAuthenticating: false});
        };
        fetchData();
    }, []);

    // get current user information ####################################
    const getUserInfo = async () => {
        try {
            let id = "";
            await Auth.currentUserInfo().then(res => {
                id = res.id;
                setState({
                    userID: id
                });
            });
        } catch (e) {
            console.log(e);
        }
    };

    const userHasAuthenticated = authenticated => {
        setState({isAuthenticated: authenticated});
    };

    const signOut = async e => {
        await Auth.signOut();
        userHasAuthenticated(false);
        setState({
            profileUrl: ""
        });
    };
    const candidateID = id => {
        setState({
            candidateId: id
        });
    };
    return (
        <AppContext.Provider value={[getUserInfo, signOut, candidateID, userHasAuthenticated, state, setState]}>
        <BrowserRouter>
            <div className="App site">
                <ResponsiveAppBar />
                <div className="site-content">
                    <div className={"container"}>
                        <Routes />
                    </div>
                </div>
            </div>
        </BrowserRouter>
        </AppContext.Provider>
    );
}
export default App;