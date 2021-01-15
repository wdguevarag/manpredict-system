import React from 'react'
import {Switch, Route, Redirect, NavLink} from 'react-router-dom';
import TitleClient from "../components/specificComponents/titleSection/titleClient/titleSection";
import Stuff from "../Stuff";
import Contact from "../Contact";
import TitleArea from "../components/specificComponents/titleSection/titleArea/titleSection";
import TitleGeneralInspections
    from "../components/specificComponents/titleSection/titleGeneralInspections/titleSection";
import Grid from "@material-ui/core/Grid";
import TreeView from "../components/mainComponents/treeView/treeView";

import { useHistory } from "react-router-dom";

import * as authService from '../services/loginService'
import Button from "@material-ui/core/Button";

export const AppRoutes = () => {

    const history = useHistory();

    const OnClickLogout = () => {
        history.push("/login");
        authService.logoutUser();
        window.location.reload();
    };

    return (
        <>
            <Grid container spacing={0} className={`systemMainContent`}>
                <Grid item xs={12}>
                    <div className={`header`}>
                        <Grid container spacing={0}>
                            <Grid item xs={3}>
                                <img alt={``} src={`/images/logo-mp.png`} className={`main-logo`}/>
                            </Grid>
                            <Grid item xs={8} style={{paddingTop: 13}}>
                                SISTEMA DE GESTION DE INFORMACIÓN Y MONITOREO DE CONDICIONES
                            </Grid>
                            <Grid item xs={1}>
                                <Button variant="contained" color="default" className="button-menu-logout" onClick={OnClickLogout}>
                                    SALIR</Button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>

                <Grid item xs={2} className='tree'>
                    <NavLink to="/clients" className='mainItem'>
                        <div className='mainButton'>MANPREDICT</div>
                    </NavLink>
                    <TreeView/>
                </Grid>

                <Grid item xs={10}>
                    <div className="content">
                        <div className="row">
                            <Switch>
                                <Route exact path={`/clients`} component={() => <TitleClient/>}/>
                                <Route path="/stuff" component={Stuff}/>
                                <Route path="/contact" component={Contact}/>
                                <Route path="/area/:id" component={() => <TitleArea/>}/>
                                <Route path="/gen_insp/:id" component={() => <TitleGeneralInspections/>}/>
                                <Redirect to="/login"/>
                            </Switch>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}
