import React, {useEffect, useRef, useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import * as componentActions from "../../../store/actions/componentsActions";

import {AlertMessage} from "../../generals/alertMessage/alertMessage";

export const NewComponent = (props) => {

    const childRef = useRef();

    const [fromValues, setFromValues] = useState({
        componentName: ""
    });

    const { componentName } = fromValues;
    const [alertMessage, setAlertMessage] = useState(null);
    const [typeAlert, setTypeAlert] = useState("success");

    useEffect(()=>{
        if(props.componentEdit){
            setFromValues({
                componentName: props.componentEdit.componentName
            })
        }

        else setFromValues({
            componentName: ""
        })

    },[props.componentEdit])

    const handleInputChange = (event) => {
        setFromValues({
            ...fromValues,
            [event.target.name] : event.target.value
        })
    }

    const saveNewComponent = async () => {

        if (
            fromValues.componentName !== ""
        ) {
            let listComponent = await componentActions.PostNewComponent(fromValues);

            if (!listComponent.success) {
                childRef.current.handleClick()
                setTypeAlert("warning");
                setAlertMessage(listComponent.message)
            }
            else {
                setFromValues({
                    componentName: ""
                })
                childRef.current.handleClick()
                setTypeAlert("success");
                setAlertMessage('Componente agregado exitosamente!')
                props.onClicGetData();
            }

        } else {
            childRef.current.handleClick()
            setTypeAlert("warning");
            setAlertMessage('Campos obligatorios faltantes')
        }

    }

    const updateComponent = async () => {
        if (
            fromValues.firstName !== ""
        ) {

            let editComponent = await componentActions.PutEditComponent(fromValues, props.componentEdit.componentId);

            if (!editComponent.success) {
                childRef.current.handleClick()
                setTypeAlert("warning");
                setAlertMessage(editComponent.message)
            } else {
                childRef.current.handleClick()
                setTypeAlert("success");
                setAlertMessage('Componente actualizado exitosamente!')
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
                <Grid item xs={11} style={{marginTop: 15}}>
                    <TextField
                        placeholder={"Nombre"}
                        id="componentName"
                        name="componentName"
                        value={componentName}
                        onChange={handleInputChange}
                        label="Nombre" variant="outlined" size="small"
                        fullWidth
                        required
                    />
                </Grid>

                <Grid item xs={12}>
                    {
                        props.action === 'new' ?
                            <Button variant="contained" color="primary" style={{marginTop: 15}} onClick={() => {
                                saveNewComponent()
                            }}>
                                Guardar
                            </Button> :
                            <Button variant="contained" color="primary" style={{marginTop: 15}} onClick={() => {
                                updateComponent()
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
