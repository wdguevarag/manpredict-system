import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import * as fleetActions from "../../../store/actions/fleetsActions";
import IconButton from "@material-ui/core/IconButton";
import {Block, Check, Edit, LibraryAdd} from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import {NewFleet} from "../fleets/newFleet";
import {DisabledFleet} from "../fleets/disabledFleet";

export const ListFleet = () => {

    const [fleetSelected, setFleetSelected] = useState({ fleetName: '' });

    const [actualAction, setActualAction] = useState(0);

    const [listFleets, setListFleets] = useState(null)

    const [count, setCount] = useState(0);

    const setFleetEdit = (fleetSelected) => {
        setActualAction(2);
        setFleetSelect(fleetSelected);
    }

    const setAddFleet = () => {
        setActualAction(1);
    }

    const setFleetDisabled = (fleetSelected) => {
        setActualAction(3);
        setFleetSelect(fleetSelected);
    }

    const setFleetEnabled = (fleetSelected) => {
        setActualAction(4);
        setFleetSelect(fleetSelected);
    }

    const setFleetSelect = (fleetSelected) => {
        setFleetSelected({
            fleetId: fleetSelected.fleet_id,
            fleetName: fleetSelected.fleet_name
        })
    }

    useEffect(()=>{
        getData()
    },[count]);

    const getData = async () => {
        let getListFleets = await fleetActions.GetAllFleets();
        setListFleets(getListFleets.fleets);

        if(count===0) setCount(1);
    }

    return(
        <Grid container>
            <Grid item xs={8} className={`left-section`}>
                <div className={`table-content-scroll`}>
                    <table className={'table-users'}>
                        <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Activo</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                            listFleets?.map(
                                (item, index) =>
                                    <tr key={index} className={`status-${item.is_active}`}>
                                        <td className={`td-item-name`}>{item.fleet_name}</td>
                                        <td className={`td-item`}>
                                            <div
                                                className={`non-selectable status-color-${item.is_active}`}>{(item.is_active) ? 'Activo' : 'Inactivo'}</div>
                                        </td>
                                        <td className={`td-item centered`}>
                                            {item.is_active ? <div>
                                                    <IconButton color="primary" aria-label="upload picture" fleet="span" onClick={()=>{setFleetEdit(item)}}>
                                                        <Edit fontSize="small"/>
                                                    </IconButton>
                                                    {/*<IconButton color="primary" aria-label="upload picture" fleet="span" onClick={()=>{setUserDelete(item)}}>*/}
                                                    {/*    <Delete fontSize="small" />*/}
                                                    {/*</IconButton>*/}
                                                    <IconButton color="primary" aria-label="upload picture" fleet="span" onClick={()=>{setFleetDisabled(item)}}>
                                                        <Block fontSize="small"/>
                                                    </IconButton></div> :
                                                <IconButton color="primary" aria-label="upload picture" fleet="span" onClick={()=>{setFleetEnabled(item)}}>
                                                    <Check fontSize="small"/>
                                                </IconButton>}
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </Grid>
            <Grid item xs={4} className={`right-section`}>
                <div className={'add-user-section'}>
                    {
                        (actualAction > 1) ?
                            <IconButton color="primary" fleet="span" onClick={()=>{setAddFleet()}}>
                                <LibraryAdd/>
                            </IconButton> :
                            <div style={{height: 48}}/>

                    }

                </div>

                {
                    (actualAction === 0) ?
                        <div className={'icon-add-user'}>
                            <Fab color="primary" aria-label="add" onClick={()=>{setAddFleet()}}>
                                <LibraryAdd fontSize="large"/>
                            </Fab>
                        </div> :
                        (actualAction === 1) ?
                            <div>
                                <div className={'list-user-title'}>Nueva flota</div>
                                <NewFleet onClicGetData={getData} action={'new'}/>
                            </div> :
                            (actualAction === 2) ?
                                <div>
                                    <div className={'list-user-title'}>Actualizar fleota</div>
                                    <NewFleet fleetEdit={fleetSelected} onClicGetData={getData} action={'edit'}/>
                                </div> :
                                (actualAction === 3) ?
                                    <DisabledFleet fleetSelected={fleetSelected} action={false} onClicGetData={getData} /> :
                                    (actualAction === 4) ?
                                        <DisabledFleet fleetSelected={fleetSelected} action={true}  onClicGetData={getData} /> :

                                        <div>Crear nuevo flota</div>
                }
            </Grid>
        </Grid>
    )
}
