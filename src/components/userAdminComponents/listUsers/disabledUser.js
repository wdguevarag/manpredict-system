import React, {useEffect, useRef, useState} from "react";
import Button from "@material-ui/core/Button";

import {AlertMessage} from "../../generals/alertMessage/alertMessage";
import * as authActions from "../../../store/actions/authActions";

export const DisabledUser = (props) => {

    const childRef = useRef();

    const [alertMessage, setAlertMessage] = useState(null);
    const [typeAlert, setTypeAlert] = useState(null);
    const [statusButton, setStatusButton] = useState(false);

    useEffect(() => {
        setStatusButton(false)
    }, [props.userSelected])

    const actionDisabled = async (status) => {

        let disabledUser = await authActions.PutDisabledUser(status, props.userSelected.userId);


        if (!disabledUser.success) {
            childRef.current.handleClick()
            setTypeAlert("warning");
            setAlertMessage(disabledUser.message)
        } else {
            status ? setAlertMessage('Usuario Deshabilitado') : setAlertMessage('Usuario Habilitado')
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
                        <div className={'list-user-title'}>Habilitar usuario<br/></div> :
                        <div className={'list-user-title'}>Deshabilitar usuario<br/></div>
                }
                {
                    props.action ?
                        <div>Está seguro que sea habilitar el usuario:</div> :
                        <div>Está seguro que sea deshabilitar el usuario:</div>
                }

                <br/><br/>{props.userSelected.user}
                -> {props.userSelected.firstName} {props.userSelected.lastName}
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
