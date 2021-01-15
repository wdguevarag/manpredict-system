import React, {useEffect, useRef, useState} from "react";
import Button from "@material-ui/core/Button";

import {AlertMessage} from "../../generals/alertMessage/alertMessage";
import * as componentActions from "../../../store/actions/componentsActions";
import Alert from "@material-ui/lab/Alert";

export const DisabledComponent = (props) => {

    const childRef = useRef();

    const [alertMessage, setAlertMessage] = useState(null);
    const [typeAlert, setTypeAlert] = useState(null);
    const [statusButton, setStatusButton] = useState(false);

    useEffect(() => {
        setStatusButton(false)
    }, [props.componentSelected])

    const actionDisabled = async (status) => {

        let disabledComponent = await componentActions.PutDisabledComponent(status, props.componentSelected.componentId);

        if (!disabledComponent.success) {
            childRef.current.handleClick()
            setTypeAlert("warning");
            setAlertMessage(disabledComponent.message)
        } else {
            status ? setAlertMessage('Componente Deshabilitado') : setAlertMessage('Componente Habilitado')
            setTypeAlert('success')
            childRef.current.handleClick()

            props.onClicGetData();
            setStatusButton(true)
        }
    };

    console.log('ASDAD=> ', props)

    return (
        <>
            <div>
                {
                    props.action ?
                        <div className={'list-user-title'}>Habilitar componente<br/></div> :
                        <div className={'list-user-title'}>Deshabilitar componente<br/></div>
                }
                {
                    props.action ?
                        <div>Está seguro que sea habilitar el componente:</div> :
                        <div>Está seguro que sea deshabilitar el componente:</div>
                }

                <br/>{props.componentSelected.componentName}
                <br/><br/>

                {
                    props.action ?
                        <Alert variant="outlined" severity="warning" style={{marginRight: 35}}>
                            Si habilita este componente, se habilitarán también todos
                            los elementos asociados.
                        </Alert> :
                        <Alert variant="outlined" severity="warning" style={{marginRight: 35}}>
                            Si deshabilita este componente, se deshabilitarán también todos
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
