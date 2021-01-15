import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

import * as authService from '../../services/loginService'

import { useForm } from "../../hooks/useForm";

import { SetUser } from '../../store/actions/authActions';

import "./styles.css";
import TextField from "@material-ui/core/TextField";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        userName: "",
        password: "",
        errorPass: false,
        errorUser: false,
        showPassword: false,
        messageError: "",
        redirect: false,
    });

    const history = useHistory();

    const [fromValues, handleInputChange] = useForm({ email: '', password: '' })
    const { email, password } = fromValues;
    const useViewport = () => {
        const [width, setWidth] = useState(window.innerWidth);

        useEffect(() => {
            const handleWindowResize = () => setWidth(window.innerWidth);
            window.addEventListener("resize", handleWindowResize);
            return () => window.removeEventListener("resize", handleWindowResize);
        }, []);

        // Return the width so we can use it in our components
        return width;
    };

    const OnClickLogin = async () => {

        setValues({
            ...values,
            errorUser: false,
            errorPass: false,
            messageError: "",
        });

        const { response } = await SetUser(dispatch, { username: email, password: password });


        if (response.success) {
            history.push("/clients");

            const result = Object.keys(response).map((key) => [key, response[key]]);
            authService.loginUser(JSON.stringify(result));

            window.location.reload();

        } else {
            setValues({
                ...values,
                errorUser: true,
                errorPass: true,
                messageError: response.message,
            });
        }
    };


    return (
        <div className="backgroundlogin">


            <Grid container spacing={0} className="container-login">
                <Grid item xs={1} sm={4}></Grid>
                <Grid item xs={2} sm={2}>
                    <div className="div-container">
                        {useViewport() <= 500 ? (
                            <img alt={``} src={`/images/logo-mp.png`} className={`main-logo-login`}/>
                        ) : (
                            <img alt={``} src={`/images/logo-mp.png`} className={`main-logo-login`}/>
                        )}

                        <div className="root">

                            <div className="cardContent MuiPaper-rounded">


                                <TextField
                                    onChange={handleInputChange}
                                    value={email}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Usuario"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />

                                <TextField
                                    value={password}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />

                                {values.messageError.length > 0 ? (
                                    <Grid item xs={10} sm={10} className="utils-4">
                                        <span className="utils-5">{values.messageError}</span>
                                    </Grid>
                                ) : (
                                    ""
                                )}

                                <Button
                                    // type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="login-btn"
                                    onClick={OnClickLogin}
                                >
                                    Ingresar
                                </Button>

                                <Grid item xs={10} sm={10} className="utils-7">
                                    <span>In case you can't log in</span>
                                    <br></br>
                                    <span>
                    please contact one of our <u>Administrators</u>
                  </span>
                                </Grid>
                            </div>
                        </div>

                    </div>
                </Grid>
                <Grid item xs={1} sm={4}></Grid>
            </Grid>
        </div>
    );
};
