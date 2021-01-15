import React, {useEffect, useRef, useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";

import * as authActions from "../../../store/actions/authActions";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {AlertMessage} from "../../generals/alertMessage/alertMessage";

export const NewUser = (props) => {

    const childRef = useRef();

    console.log('--------------')
    console.log('PROPS=> ', props)
    const [fromValues, setFromValues] = useState({
        firstName: "", lastName: "", user: "", password: "", role: ""
    });

    const { firstName, lastName, user, password, role } = fromValues;
    const [alertMessage, setAlertMessage] = useState(null);
    const [typeAlert, setTypeAlert] = useState(null);

    const roles = [
        {
            value: '1',
            label: 'Administrador',
        },
        {
            value: '2',
            label: 'Inspector',
        },
        {
            value: '3',
            label: 'Cliente',
        }
    ];

    const [checkPass, setCheckPass] = useState(false);

    const changeCheckBoxPass = () => {
        setCheckPass(!checkPass);
    }

    useEffect(()=>{
        if(props.userEdit){
            setFromValues({
                firstName: props.userEdit.firstName,
                lastName: props.userEdit.lastName,
                user: props.userEdit.user,
                password: "", role: props.userEdit.role
            })
            setCheckPass(false)
        }

        else setFromValues({
            firstName: "", lastName: "", user: "", password: "", role: ""
        })

    },[props.userEdit])

    const handleInputChange = (event) => {
        setFromValues({
            ...fromValues,
            [event.target.name] : event.target.value
        })
    }

    const saveNewUser = async () => {

        if (
            fromValues.firstName !== "" &&
            fromValues.lastName !== "" &&
            fromValues.user !== "" &&
            fromValues.password !== "" &&
            fromValues.role !== ""
        ) {
            let listAlarms = await authActions.PostNewUser(fromValues);

            if (!listAlarms.success) {
                childRef.current.handleClick()
                setTypeAlert("warning");
                setAlertMessage(listAlarms.message)
            }
            else {
                setFromValues({
                    firstName: "", lastName: "", user: "", password: "", role: ""
                })
                childRef.current.handleClick()
                setTypeAlert("success");
                setAlertMessage('Usuario agregado exitosamente!')
                props.onClicGetData();
            }

        } else {
            childRef.current.handleClick()
            setTypeAlert("warning");
            setAlertMessage('Campos obligatorios faltantes')
        }

    }

    const updateUser = async () => {
        if (
            fromValues.firstName !== "" &&
            fromValues.lastName !== "" &&
            fromValues.user !== "" &&
            fromValues.role !== ""
        ) {

            if(!fromValues.password && checkPass) {
                childRef.current.handleClick()
                setTypeAlert("warning");
                setAlertMessage('Ha seleccionado edición de contraseña, Campo Obligatorio')
            }
            else {

                let editAlarm = await authActions.PutEditUser(fromValues, checkPass, props.userEdit.userId);

                if (!editAlarm.success) {
                    childRef.current.handleClick()
                    setTypeAlert("warning");
                    setAlertMessage(editAlarm.message)
                } else {
                    childRef.current.handleClick()
                    setTypeAlert("success");
                    setAlertMessage('Usuario actualizado exitosamente!')
                    props.onClicGetData();
                }
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
                        placeholder={"Nombre"}
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={handleInputChange}
                        label="Nombre" variant="outlined" size="small"
                        required
                    />
                </Grid>
                <Grid item xs={6} style={{marginTop: 15}}>
                    <TextField
                        placeholder={"Apellido"}
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={handleInputChange}
                        label="Apellido" variant="outlined" size="small"
                        required
                    />
                </Grid>

                <Grid item xs={6} style={{marginTop: 15}}>
                    <TextField
                        placeholder={"Usuario"}
                        id="user"
                        name="user"
                        value={user}
                        onChange={handleInputChange}
                        label="Usuario" variant="outlined" size="small"
                        required
                    />
                </Grid>
                <Grid item xs={6} style={{marginTop: 15}}>
                    {
                        props.action === 'new' ?
                            <TextField
                                placeholder={"Contrasena"}
                                id="password"
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                                label="Contraseña" variant="outlined" type="password" size="small"
                                required
                            /> :
                            checkPass ?
                                <TextField
                                    placeholder={"Contrasena"}
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={handleInputChange}
                                    label="Contraseña" variant="outlined" type="password" size="small"
                                    required
                                /> : <div/>
                    }
                </Grid>
                <Grid item xs={6} style={{marginTop: 15}}>
                    <TextField
                        style={{ width: '19ch'}}
                        id="role"
                        name="role"
                        select
                        value={role}
                        onChange={handleInputChange}
                        label="Rol" variant="outlined" size="small"
                        required
                    >
                        {roles.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                {
                    props.action === 'edit' ?
                        <FormControlLabel style={{paddingTop: 13}}
                        control={
                            <Checkbox
                                checked={checkPass}
                                onChange={changeCheckBoxPass}
                                name="checkedB"
                                color="primary"
                            />} label="Editar contraseña"
                    /> : ''
                }


                <Grid item xs={12}>
                    {
                        props.action === 'new' ?
                            <Button variant="contained" color="primary" style={{marginTop: 15}} onClick={() => {
                                saveNewUser()
                            }}>
                                Guardar
                            </Button> :
                            <Button variant="contained" color="primary" style={{marginTop: 15}} onClick={() => {
                                updateUser()
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
