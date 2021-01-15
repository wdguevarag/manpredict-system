import React, {useState} from 'react';
import {Switch, Route, Redirect, NavLink} from 'react-router-dom';

import TitleClient from "../components/specificComponents/titleSection/titleClient/titleSection";
import TitleArea from "../components/specificComponents/titleSection/titleArea/titleSection";
import TitleGeneralInspections
    from "../components/specificComponents/titleSection/titleGeneralInspections/titleSection";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TreeView from "../components/mainComponents/treeView/treeView";
import * as authService from "../services/loginService";

import {useHistory} from "react-router-dom";

import Group from '@material-ui/icons/Group';

export const DashboardRoutes = () => {


    const history = useHistory();

    const [sizeComponent, setsizeComponent] = useState(10);
    const [sizeSideBar, setsizeSideBar] = useState(2);
    const [styleSideBar, setStyleSideBar] = useState('show-tree')

    const OnClickLogout = () => {
        history.push("/login");
        authService.logoutUser();
        window.location.reload();
    };

    const OnClickChange = () => {
        sizeComponent === 10 ? setsizeComponent(12) : setsizeComponent(10);
        sizeSideBar === 2 ? setsizeSideBar(0) : setsizeSideBar(2);
        styleSideBar === 'show-tree' ? setStyleSideBar('hide-tree') : setStyleSideBar('show-tree');
    }

    const OnClickConfigUsers = () => {
        history.push("/users");
    }

    return (
        <>
            <Grid container spacing={0} className={`systemMainContent`}>
                <Grid item xs={12}>
                    <div className={`header`}>
                        <Grid container spacing={0}>
                            <Grid item xs={1}>
                                <Button variant="contained" color="default" className="button-menu-logout"
                                        onClick={OnClickChange}>
                                    =</Button>
                            </Grid>
                            <Grid item xs={2}>
                                <img alt={``} src={`/images/logo-mp.png`} className={`main-logo`}/>
                            </Grid>
                            <Grid item xs={7} style={{paddingTop: 13}}>
                                SISTEMA DE GESTION DE INFORMACIÓN Y MONITOREO DE CONDICIONES
                            </Grid>
                            <Grid item xs={2}>
                                <Button variant="contained" color="default" className="button-menu-logout"
                                        onClick={OnClickLogout}>
                                    SALIR</Button>

                                <Button variant="contained" color="default" className="button-menu-logout" style={{marginLeft:10}}
                                        onClick={OnClickConfigUsers}>
                                    <Group/></Button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>

                <Grid item xs={sizeSideBar} className={`tree ${styleSideBar}`}>
                    <NavLink to="/clients" className='mainItem'>
                        <div className='mainButton'>MANPREDICT</div>
                    </NavLink>
                    <TreeView/>
                </Grid>

                <Grid item xs={sizeComponent}>
                    <div className="content">
                        <div className="row">
                            <Switch>

                                <Route exact path="/clients" component={() => <TitleClient/>}/>
                                <Route exact path="/area/:id" component={() => <TitleArea/>}/>
                                <Route exact path="/gen_insp/:cid/:aid" component={() => <TitleGeneralInspections/>}/>
                                <Redirect to="/clients"/>

                            </Switch>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}
