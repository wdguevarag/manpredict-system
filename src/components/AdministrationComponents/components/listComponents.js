import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import {Block, Check, Edit, LibraryAdd} from "@material-ui/icons";
import React, {useEffect, useState} from "react";
import * as componentActions from "../../../store/actions/componentsActions";
import Fab from "@material-ui/core/Fab";
import {NewComponent} from "./newComponent";
import {DisabledComponent} from "./disabledComponent";

export const ListComponents = () => {

    const [componentSelected, setComponentSelected] = useState({ componentName: '' });

    const [actualAction, setActualAction] = useState(0);

    const [listComponents, setListComponents] = useState(null)

    const [count, setCount] = useState(0);

    const setComponentEdit = (componentSelected) => {
        setActualAction(2);
        setComponentSelect(componentSelected);
    }

    const setAddComponent = () => {
        setActualAction(1);
    }

    const setComponentDisabled = (componentSelected) => {
        setActualAction(3);
        setComponentSelect(componentSelected);
    }

    const setComponentEnabled = (componentSelected) => {
        setActualAction(4);
        setComponentSelect(componentSelected);
    }

    const setComponentSelect = (componentSelected) => {
        setComponentSelected({
            componentId: componentSelected.component_id,
            componentName: componentSelected.component_name
        })
    }

    useEffect(()=>{
        getData()
    },[count]);

    const getData = async () => {
        let getListComponents = await componentActions.GetAllComponents();
        setListComponents(getListComponents.components);

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
                        listComponents?.map(
                            (item, index) =>
                                <tr key={index} className={`status-${item.is_active}`}>
                                    <td className={`td-item-name`}>{item.component_name}</td>
                                    <td className={`td-item`}>
                                        <div
                                            className={`non-selectable status-color-${item.is_active}`}>{(item.is_active) ? 'Activo' : 'Inactivo'}</div>
                                    </td>
                                    <td className={`td-item centered`}>
                                        {item.is_active ? <div>
                                                <IconButton color="primary" aria-label="upload picture" component="span" onClick={()=>{setComponentEdit(item)}}>
                                                    <Edit fontSize="small"/>
                                                </IconButton>
                                                {/*<IconButton color="primary" aria-label="upload picture" component="span" onClick={()=>{setUserDelete(item)}}>*/}
                                                {/*    <Delete fontSize="small" />*/}
                                                {/*</IconButton>*/}
                                                <IconButton color="primary" aria-label="upload picture" component="span" onClick={()=>{setComponentDisabled(item)}}>
                                                    <Block fontSize="small"/>
                                                </IconButton></div> :
                                            <IconButton color="primary" aria-label="upload picture" component="span" onClick={()=>{setComponentEnabled(item)}}>
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
                        <IconButton color="primary" component="span" onClick={()=>{setAddComponent()}}>
                            <LibraryAdd/>
                        </IconButton> :
                        <div style={{height: 48}}/>

                }

            </div>

            {
                (actualAction === 0) ?
                    <div className={'icon-add-user'}>
                        <Fab color="primary" aria-label="add" onClick={()=>{setAddComponent()}}>
                            <LibraryAdd fontSize="large"/>
                        </Fab>
                    </div> :
                (actualAction === 1) ?
                    <div>
                        <div className={'list-user-title'}>Nuevo componente</div>
                        <NewComponent onClicGetData={getData} action={'new'}/>
                    </div> :
                (actualAction === 2) ?
                    <div>
                        <div className={'list-user-title'}>Actualizar componente</div>
                        <NewComponent componentEdit={componentSelected} onClicGetData={getData} action={'edit'}/>
                    </div> :
                (actualAction === 3) ?
                    <DisabledComponent componentSelected={componentSelected} action={false} onClicGetData={getData} /> :
                (actualAction === 4) ?
                    <DisabledComponent componentSelected={componentSelected} action={true}  onClicGetData={getData} /> :

                <div>Crear nuevo componente</div>
            }
        </Grid>
    </Grid>
    )
}
