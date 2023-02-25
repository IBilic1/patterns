import React from "react";
import {BrowserRouter, Redirect, Route, Switch, useHistory} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";
import SignIn from "./views/auth/signIn/SignIn";
import Admin from "./views/admin/Admin";
import Main from "./views/default/Main";
import SidebarContainer from "./components/sidebar/SidebarContainer";
import SignUp from "views/auth/register/SignUp";
import Profile from "./views/auth/profile/Profile";
import {UserApiProp} from "./types/user/types";
import AppBar from "./components/appbar/AppBar";
import {Box, styled} from "@mui/material";

const PageContent = styled(Box)`
  width: 75%;
  margin-left: 20rem;
`;

const AppBarCustom = styled(AppBar)`
  margin-bottom: 2rem;
  background-color:#adbce6;
`;

type UserContextType = {
    user: UserApiProp | null;
    setUser: React.Dispatch<React.SetStateAction<UserApiProp | null>>;
};

export const UserContext = React.createContext<UserContextType>({} as UserContextType);

function App() {
    const [user, setUser] = React.useState<UserApiProp | null>(null);

    const userContext = {
        user,
        setUser,
    };

    return (
        <UserContext.Provider value={userContext}>
            <Provider store={store}>
                <AppBar/>
                <BrowserRouter>
                    <SidebarContainer/>
                    <PageContent>
                        <React.StrictMode>
                            <Switch>
                                <Route path={`/aadabt`} component={Main}/>
                                <Route path={`/admin`} component={Admin}/>
                                <Route path={`/profile`} component={Profile}/>
                                <Route path={`/sign-in`} component={SignIn}/>
                                <Route path={`/sign-up`} component={SignUp}/>
                                <Redirect from='/' to='/aadabt'/>
                            </Switch>
                        </React.StrictMode>
                    </PageContent>
                </BrowserRouter>
            </Provider>
        </UserContext.Provider>)
}

export default App;