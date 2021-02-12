import React, {useEffect, useRef, useState} from "react";
import Button from "@material-ui/core/Button";

import {AlertMessage} from "../../generals/alertMessage/alertMessage";
import * as elementActions from "../../../store/actions/elementsActions";
import Alert from "@material-ui/lab/Alert";

export const DisabledElement = (props) => {

    const childRef = useRef();

    const [alertMessage, setAlertMessage] = useState(null);
    const [typeAlert, setTypeAlert] = useState(null);
    const [statusButton, setStatusButton] = useState(false);

    useEffect(() => {
        setStatusButton(false)
    }, [props.elementSelected])

    const actionDisabled = async (status) => {

        let disabledElement = await elementActions.PutDisabledElement(status, props.elementSelected.elementId);

        if (!disabledElement.success) {
            childRef.current.handleClick()
            setTypeAlert("warning");
            setAlertMessage(disabledElement.message)
        } else {
            status ? setAlertMessage('Elemento Deshabilitado') : setAlertMessage('Elemento Habilitado')
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
                        <div className={'list-user-title'}>Habilitar Elemento<br/></div> :
                        <div className={'list-user-title'}>Deshabilitar Elemento<br/></div>
                }
                {
                    props.action ?
                        <div>Está seguro que desea habilitar el Elemento:</div> :
                        <div>Está seguro que desea deshabilitar el Elemento:</div>
                }

                <br/>{props.elementSelected.elementName}
                <br/><br/>

                {
                    props.action ?
                        <Alert variant="outlined" severity="warning" style={{marginRight: 35}}>
                            Si habilita este Elemento, se habilitarán también todos
                            los elementos asociados.
                        </Alert> :
                        <Alert variant="outlined" severity="warning" style={{marginRight: 35}}>
                            Si deshabilita este Elemento, se deshabilitarán también todos
                            los elementos asociados.
                        </Alert>
                }

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
