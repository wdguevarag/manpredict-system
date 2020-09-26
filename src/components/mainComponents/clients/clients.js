import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import ClientItem from '../../specificComponents/clientItem/clientItem';
import "./styles.css";

import { GetClients } from '../../../store/actions/clientsActions';

class Clients extends Component {

    static defaultProps = {
        clientsList: [],
        basicListItem: []
    }

    constructor(props){
        super(props);
        this.state = {
            css: `clients-content`,
            clientsList: this.props.clientsList,
        }
    }

    componentDidMount = async () => {

        let res = null;

         await GetClients().then(function (result) {
            res = result;
        });

        let testArrayClients = res.result.clients;

        let clientsToAdd = this.SetClientsList(testArrayClients);

        this.setState({
            clientsList: clientsToAdd
        });
    }

    SetClientsList(list) {
        const items = [];
        for(let i = 0; i < list.length; i++) {
            const client = list[i];
            items.push(
                <Grid item xs={6}>
                    <ClientItem
                        key={`${this.state.css}-${client.clientId}`}
                        clientId={client.clientId}
                        clientName={client.clientName}
                        imgRoute={client.imgRoute}
                        urlRedirect={client.urlRedirect}
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
                    {this.state.clientsList}
                </Grid>
            </div>
        );
    }
}

export default Clients;
