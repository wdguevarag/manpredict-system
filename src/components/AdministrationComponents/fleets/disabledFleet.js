import React, {useEffect, useRef, useState} from "react";
import Button from "@material-ui/core/Button";

import {AlertMessage} from "../../generals/alertMessage/alertMessage";
import * as fleetActions from "../../../store/actions/fleetsActions";
import Alert from "@material-ui/lab/Alert";

export const DisabledFleet = (props) => {

    const childRef = useRef();

    const [alertMessage, setAlertMessage] = useState(null);
    const [typeAlert, setTypeAlert] = useState(null);
    const [statusButton, setStatusButton] = useState(false);

    useEffect(() => {
        setStatusButton(false)
    }, [props.fleetSelected])

    const actionDisabled = async (status) => {

        let disabledFleet = await fleetActions.PutDisabledFleet(status, props.fleetSelected.fleetId);

        if (!disabledFleet.success) {
            childRef.current.handleClick()
            setTypeAlert("warning");
            setAlertMessage(disabledFleet.message)
        } else {
            status ? setAlertMessage('Flota deshabilitada') : setAlertMessage('Flota habilitada')
            setTypeAlert('success')
            childRef.current.handleClick()

            props.onClicGetData();
            setStatusButton(true)
        }
    };

    return (
        <>
            <div>
                {
                    props.action ?
                        <div className={'list-user-title'}>Habilitar flota<br/></div> :
                        <div className={'list-user-title'}>Deshabilitar flota<br/></div>
                }
                {
                    props.action ?
                        <div>Está seguro que desea habilitar la flota:</div> :
                        <div>Está seguro que desea deshabilitar la flota:</div>
                }

                <br/>{props.fleetSelected.fleetName}
                <br/><br/>

                <Button variant="contained" color={props.action ? "primary" : "secondary"} style={{marginTop: 15}}
                        onClick={() => actionDisabled(props.action)} disabled={statusButton}>
                    {props.action ? <span>Habilitar</span> : <span>Deshabilitar</span>}
                </Button>

                <AlertMessage ref={childRef}
                              alertMessage={alertMessage}
                              typeAlert={typeAlert}
                />
            </div>
        </>
    )
}
