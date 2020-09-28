import React, { Component } from "react";

import "./styles.css";

import {
    NavLink
} from "react-router-dom";

class ClientItem extends Component {

    static defaultProps = {
        clientId: 0,
        clientName: ``,
        imgRoute: ``
    }

    constructor(props){
        super(props);
        this.state = {
            css: `clients-list`,
            clientId: this.props.clientId,
            clientName: this.props.clientName,
            imgRoute: this.props.imgRoute
        }
    }

    componentDidMount() {
    }

    SelectClient = (clientId) => {
        console.log('Cliente seleccionado=> ', clientId)

    }

    render() {
        return (
            <div>
                <NavLink className={`link-no-decoration`} to={`/area/`+this.state.clientId}>
                <div className={`${this.state.css}-item cursor-pointer`} onClick={ () => this.SelectClient([this.state.clientId])}>
                    <img src={`${this.props.imgRoute}`} className={`${this.state.css}-img`} alt="logo" />
                    <div className={`${this.state.css}-subtitle`}>{this.props.clientName}</div>
                </div>
                </NavLink>
            </div>
        );
    }
}

export default ClientItem;
