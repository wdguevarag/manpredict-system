import React from 'react'
import { HashRouter as Router, Switch, Route,Redirect } from 'react-router-dom'
import { LoginPage } from '../pages/Login/LoginPage'

import { AppRoutes } from './app.routes'

export const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                <Route path="/" component={AppRoutes} />
                <Redirect to="/login" />
            </Switch>
        </Router>
    )
}
