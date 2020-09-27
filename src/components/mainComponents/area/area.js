import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import AreaItem from '../../specificComponents/areaItem/areaItem';

import { GetAreas } from '../../../store/actions/clientsActions';

class Areas extends Component {

    static defaultProps = {
        areasList: [],
        basicListItem: [],
        clientId: null
    }

    constructor(props){
        super(props);
        this.state = {
            css: `areas-content`,
            areasList: this.props.areasList,
            clientId: this.props.clientId
        }
    }

    componentDidMount = async () => {
        await this.SetAreaData();
    };

    componentDidUpdate = async () => {
        await this.SetAreaData();
    };

    SetAreaData = async () => {
        let res = null;
        await GetAreas(this.props.clientId).then(function (result) {
            res = result;
        });
        let testArrayAreas = res.result.clients;
        let areasToAdd = this.SetAreasList(testArrayAreas);
        this.setState({
            areasList: areasToAdd
        });
    };

    SetAreasList(list) {
        const items = [];
        for(let i = 0; i < list.length; i++) {
            const area = list[i];
            items.push(
                <Grid item xs={6}>
                    <AreaItem
                        key={`${this.state.css}-${area.areaId}`}
                        areaId={area.areaId}
                        clientId={area.clientId}
                        areaName={area.areaName}
                        imgRoute={area.imgRoute}
                        urlRedirect={area.urlRedirect}
                    />
                </Grid>
            )
        }

        return items;
    }

    render() {
        return (
            <div className={`${this.state.css}`}>
                <Grid container spacing={0}>
                    {this.state.areasList}
                </Grid>
            </div>
        );
    }
}

export default Areas;
