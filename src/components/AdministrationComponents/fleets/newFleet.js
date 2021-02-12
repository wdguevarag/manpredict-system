import React, {useEffect, useRef, useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import * as fleetActions from "../../../store/actions/fleetsActions";

import {AlertMessage} from "../../generals/alertMessage/alertMessage";

export const NewFleet = (props) => {

    const childRef = useRef();

    const [fromValues, setFromValues] = useState({
        fleetName: ""
    });

    const { fleetName } = fromValues;
    const [alertMessage, setAlertMessage] = useState(null);
    const [typeAlert, setTypeAlert] = useState("success");

    useEffect(()=>{
        if(props.fleetEdit){
            setFromValues({
                fleetName: props.fleetEdit.fleetName
            })
        }

        else setFromValues({
            fleetName: ""
        })

    },[props.fleetEdit])

    const handleInputChange = (event) => {
        setFromValues({
            ...fromValues,
            [event.target.name] : event.target.value
        })
    }

    const saveNewFleet = async () => {

        if (
            fromValues.fleetName !== ""
        ) {
            let listFleet = await fleetActions.PostNewFleet(fromValues);

            if (!listFleet.success) {
                childRef.current.handleClick()
                setTypeAlert("warning");
                setAlertMessage(listFleet.message)
            }
            else {
                setFromValues({
                    fleetName: ""
                })
                childRef.current.handleClick()
                setTypeAlert("success");
                setAlertMessage('Flota agregada exitosamente!')
                props.onClicGetData();
            }

        } else {
            childRef.current.handleClick()
            setTypeAlert("warning");
            setAlertMessage('Campos obligatorios faltantes')
        }

    }

    const updateFleet = async () => {
        if (
            fromValues.firstName !== ""
        ) {

            let editFleet = await fleetActions.PutEditFleet(fromValues, props.fleetEdit.fleetId);

            if (!editFleet.success) {
                childRef.current.handleClick()
                setTypeAlert("warning");
                setAlertMessage(editFleet.message)
            } else {
                childRef.current.handleClick()
                setTypeAlert("success");
                setAlertMessage('Flota actualizada exitosamente!')
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
                        id="fleetName"
                        name="fleetName"
                        value={fleetName}
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
                                saveNewFleet()
                            }}>
                                Guardar
                            </Button> :
                            <Button variant="contained" color="primary" style={{marginTop: 15}} onClick={() => {
                                updateFleet()
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
