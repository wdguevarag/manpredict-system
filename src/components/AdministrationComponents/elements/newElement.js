import React, {useEffect, useRef, useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import * as elementActions from "../../../store/actions/elementsActions";

import {AlertMessage} from "../../generals/alertMessage/alertMessage";
import MenuItem from "@material-ui/core/MenuItem";

export const NewElement = (props) => {

    const childRef = useRef();

    console.log('PROPS=> ', props)

    const [fromValues, setFromValues] = useState({
        elementName: "", code: "", component: "", description: ""
    });

    const [listComponent, setListComponent] = useState([])

    const { elementName, code, component, description } = fromValues;
    const [alertMessage, setAlertMessage] = useState(null);
    const [typeAlert, setTypeAlert] = useState("success");

    useEffect(()=>{
        if(props.elementEdit){
            setFromValues({
                elementName: props.elementEdit.elementName,
                code: props.elementEdit.code,
                component: props.elementEdit.componentId,
                description: props.elementEdit.description
            })
        }

        else setFromValues({
            elementName: "",
            code: "",
            component: "",
            description: "",
        })

        if(props.listComponents) setListComponent(props.listComponents)

    },[props.elementEdit])

    const handleInputChange = (event) => {
        setFromValues({
            ...fromValues,
            [event.target.name] : event.target.value
        })
    }

    const saveNewElement = async () => {

        console.log('fromvalues=> ', fromValues)

        if (
            fromValues.elementName !== "" &&
            fromValues.code !== "" &&
            fromValues.component !== ""
        ) {
            let listElement = await elementActions.PostNewElement(fromValues);

            if (!listElement.success) {
                childRef.current.handleClick()
                setTypeAlert("warning");
                setAlertMessage(listElement.message)
            }
            else {
                setFromValues({
                    elementName: "",
                    code: "",
                    component: "",
                    description: ""
                })
                childRef.current.handleClick()
                setTypeAlert("success");
                setAlertMessage('Elemente agregado exitosamente!')
                props.onClicGetData();
            }

        } else {
            childRef.current.handleClick()
            setTypeAlert("warning");
            setAlertMessage('Campos obligatorios faltantes')
        }

    }

    const updateElement = async () => {
        if (
            fromValues.elementName !== "" &&
            fromValues.code !== "" &&
            fromValues.component !== ""
        ) {

            let editElement = await elementActions.PutEditElement(fromValues, props.elementEdit.elementId);

            if (!editElement.success) {
                childRef.current.handleClick()
                setTypeAlert("warning");
                setAlertMessage(editElement.message)
            } else {
                childRef.current.handleClick()
                setTypeAlert("success");
                setAlertMessage('Elemente actualizado exitosamente!')
                props.onClicGetData();
            }

        } else {
            childRef.current.handleClick()
            setTypeAlert("warning");
            setAlertMessage('Campos obligatorios faltantes')
        }
    }

    return(
        <div>
            <Grid container>
                <Grid item xs={6} style={{marginTop: 15}}>
                    <TextField
                        placeholder={"Código"}
                        id="code"
                        name="code"
                        value={code}
                        onChange={handleInputChange}
                        label="Código" variant="outlined" size="small"
                        required
                    />
                </Grid>
                <Grid item xs={11} style={{marginTop: 15}}>
                    <TextField
                        placeholder={"Nombre"}
                        id="elementName"
                        name="elementName"
                        value={elementName}
                        onChange={handleInputChange}
                        label="Nombre" variant="outlined" size="small"
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={11} style={{marginTop: 15}}>
                    <TextField
                        id="component"
                        name="component"
                        select
                        value={component}
                        onChange={handleInputChange}
                        label="Componente" variant="outlined" size="small"
                        fullWidth
                        required
                    >
                        {listComponent?.map((option) => (
                            <MenuItem key={option.component_id} value={option.component_id}>
                                {option.component_name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={11} style={{marginTop: 15}}>
                    <TextField
                        placeholder={"Descripción"}
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleInputChange}
                        label="Descripción" variant="outlined" size="small"
                        multiline rows={3}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    {
                        props.action === 'new' ?
                            <Button variant="contained" color="primary" style={{marginTop: 15}} onClick={() => {
                                saveNewElement()
                            }}>
                                Guardar
                            </Button> :
                            <Button variant="contained" color="primary" style={{marginTop: 15}} onClick={() => {
                                updateElement()
                            }}>
                                Actualizar
                            </Button>
                    }
                </Grid>

                <AlertMessage ref={childRef}
                              alertMessage={alertMessage}
                              typeAlert={typeAlert}
                />
            </Grid>
        </div>
    )
}
