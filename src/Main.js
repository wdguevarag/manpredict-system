import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

import TitleClient   from "./components/specificComponents/titleSection/titleClient/titleSection";
import TitleArea     from "./components/specificComponents/titleSection/titleArea/titleSection";
import TitleGeneralInspections     from "./components/specificComponents/titleSection/titleGeneralInspections/titleSection";

import TreeView from "./components/mainComponents/treeView/treeView";

import Stuff from "./Stuff";
import Contact from "./Contact";
import "./mainStyles.css";

class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Grid container spacing={0} className={`systemMainContent`}>
                        <Grid item xs={12}>
                            <div className={`header`}>
                                <Grid container spacing={0}>
                                    <Grid item xs={3}>
                                        <img alt={``} src={`/images/logo-mp.png`} className={`main-logo`} />
                                    </Grid>
                                    <Grid item xs={8} style={{paddingTop: 13}}>
                                        SISTEMA DE GESTION DE INFORMACIÓN Y MONITOREO DE CONDICIONES
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
                                <Route exact path={`/clients`}      component={() => <TitleClient/>}/>
                                <Route path="/stuff"                component={Stuff}/>
                                <Route path="/contact"              component={Contact}/>
                                <Route path="/area/:id"             component={() => <TitleArea/>}/>
                                <Route path="/gen_insp/:id"         component={() => <TitleGeneralInspections/>}/>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </HashRouter>
        );
    }
}

export default Main;
