import React  from 'react'
import {
    HashRouter as Router,
    Switch, Route, Redirect
} from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { LoginPage } from '../pages/Login/LoginPage'
import { DashboardRoutes } from './DashboardRoutes';
import {useSelector} from "react-redux";

import { UsersAdmin } from "../pages/UsersAdmin/UsersAdminPage";
import { ComponentsAdmin } from "../pages/ComponentsAdmin/ComponentsAdminPage";

export const NormalRoute = ({
                                 isAuthenticated,
                                 component: Component,
                                 ...rest
                             }) => {

    localStorage.setItem('lastPath', rest.location.pathname);

    return (
        <Route { ...rest }
               component={ (props) => (
                   ( isAuthenticated )
                       ? ( <Component { ...props } /> )
                       : ( <Redirect to="/login" /> )
               )}

        />
    )
}

export const AppRouter = () => {

    const { logged } = useSelector(state => state.auth);

    console.log('LOGED=> ', logged)

    return (
        <Router>
            <Switch>
                {/*<NormalRoute exact path="/home" component={ HomePage } isAuthenticated={ logged } />*/}
                {/*<NormalRoute exact isAuthenticated={logged} path="/personnel" component={ PersonnelConfigurationPage } />*/}
                <NormalRoute exact isAuthenticated={logged} path="/users" component={ UsersAdmin } />
                <NormalRoute exact isAuthenticated={logged} path="/components" component={ ComponentsAdmin } />
                <PublicRoute
                    exact
                    path="/login"
                    component={ LoginPage }
                    isAuthenticated={ logged }
                />

                <PrivateRoute
                    path="/"
                    component={ DashboardRoutes }
                    isAuthenticated={ logged }
                />
            </Switch>
        </Router>
    )
}
