import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import {Block, Check, Edit, LibraryAdd} from "@material-ui/icons";
import React, {useEffect, useState} from "react";
import Fab from "@material-ui/core/Fab";
import {NewElement} from "./newElement";
import {DisabledElement} from "./disabledElement";

import * as elementActions from "../../../store/actions/elementsActions";
import * as componentActions from "../../../store/actions/componentsActions";

export const ListElement = () => {

    const [elementSelected, setElementSelected] = useState({ elementName: '' });

    const [actualAction, setActualAction] = useState(0);

    const [listElements, setListElements] = useState(null)
    const [listComponents, setListComponents] = useState(null)

    const [count, setCount] = useState(0);

    const setElementEdit = (elementSelected) => {
        setActualAction(2);
        setElementSelect(elementSelected);
    }

    const setAddElement = () => {
        setActualAction(1);
    }

    const setElementDisabled = (elementSelected) => {
        setActualAction(3);
        setElementSelect(elementSelected);
    }

    const setElementEnabled = (elementSelected) => {
        setActualAction(4);
        setElementSelect(elementSelected);
    }

    const setElementSelect = (elementSelected) => {
        setElementSelected({
            elementId: elementSelected.element_id,
            elementName: elementSelected.element_name,
            code: elementSelected.code,
            description: elementSelected.description,
            componentId: elementSelected.component_id
        })
    }

    useEffect(()=>{
        getData()
    },[count]);

    const getData = async () => {
        let getListElements = await elementActions.GetAllElements();
        setListElements(getListElements.elements);

        let getListComponents = await componentActions.GetAllComponentsToSelect();
        setListComponents(getListComponents.components);

        if(count===0) setCount(1);
    }

    console.log('LIST ELEMENT=> ', listElements)

    return(
        <Grid container>
            <Grid item xs={8} className={`left-section`}>
                <div className={`table-content-scroll`}>
                    <table className={'table-users'}>
                        <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Comp</th>
                            <th>Activo</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                            listElements?.map(
                                (item, index) =>
                                    <tr key={index} className={`status-${item.is_active}`}>
                                        <td className={`td-item`}>{item.code}</td>
                                        <td className={`td-item-elem`}>{item.element_name}</td>
                                        <td className={`td-item-elem`}>{item.component_name}</td>
                                        <td className={`td-item`}>
                                            <div className={`non-selectable status-color-${item.is_active}`}>{(item.is_active) ? 'Activo' : 'Inactivo'}</div>
                                        </td>
                                        <td className={`td-item centered`}>
                                            {item.is_active ? <div>
                                                    <IconButton color="primary" aria-label="upload picture" element="span" onClick={()=>{setElementEdit(item)}}>
                                                        <Edit fontSize="small"/>
                                                    </IconButton>
                                                    {/*<IconButton color="primary" aria-label="upload picture" element="span" onClick={()=>{setUserDelete(item)}}>*/}
                                                    {/*    <Delete fontSize="small" />*/}
                                                    {/*</IconButton>*/}
                                                    <IconButton color="primary" aria-label="upload picture" element="span" onClick={()=>{setElementDisabled(item)}}>
                                                        <Block fontSize="small"/>
                                                    </IconButton></div> :
                                                <IconButton color="primary" aria-label="upload picture" element="span" onClick={()=>{setElementEnabled(item)}}>
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
                            <IconButton color="primary" element="span" onClick={()=>{setAddElement()}}>
                                <LibraryAdd/>
                            </IconButton> :
                            <div style={{height: 48}}/>

                    }

                </div>


                {
                    (actualAction === 0) ?
                        <div className={'icon-add-user'}>
                            <Fab color="primary" aria-label="add" onClick={()=>{setAddElement()}}>
                                <LibraryAdd fontSize="large"/>
                            </Fab>
                        </div> :
                        (actualAction === 1) ?
                            <div>
                                <div className={'list-user-title'}>Nuevo elemento</div>
                                <NewElement onClicGetData={getData} action={'new'} listComponents={listComponents}/>
                            </div> :
                        (actualAction === 2) ?
                            <div>
                                <div className={'list-user-title'}>Actualizar elemento</div>
                                <NewElement elementEdit={elementSelected} onClicGetData={getData} action={'edit'} listComponents={listComponents}/>
                            </div> :
                        (actualAction === 3) ?
                            <DisabledElement elementSelected={elementSelected} action={false} onClicGetData={getData} /> :
                        (actualAction === 4) ?
                            <DisabledElement elementSelected={elementSelected} action={true}  onClicGetData={getData} /> :

                            <div>Crear nuevo elemento</div>
                }
            </Grid>
        </Grid>
    )
}
