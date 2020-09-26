import React, { Component } from "react";

import "./styles.css";

import {
    NavLink
} from "react-router-dom";

class AreaItem extends Component {

    static defaultProps = {
        areaId: 0,
        areaName: ``,
        imgRoute: ``
    }

    constructor(props){
        super(props);
        this.state = {
            css: `area-list`,
            areaId: this.props.areaId,
            clientId: this.props.clientId,
            areaName: this.props.areaName,
            imgRoute: this.props.imgRoute
        }
    }

    componentDidMount() {
    }

    SelectArea = (areaId) => {
        console.log('area seleccionada=> ', areaId)

    }

    render() {
        return (
            <div>
                <NavLink to={`/gen_insp/`+this.state.clientId+`/`+this.state.areaId}>
                <div className={`${this.state.css}-item cursor-pointer`} onClick={ () => this.SelectArea([this.state.areaId])}>
                    <img src={`${this.props.imgRoute}`} className={`${this.state.css}-img`} alt="logo" />
                    <div className={`${this.state.css}-subtitle`}>{this.props.areaName}</div>
                </div>
                </NavLink>
            </div>
        );
    }
}

export default AreaItem;
