import React, {useEffect, useState} from "react";

import "./styles.css";
import IconButton from "@material-ui/core/IconButton";
import { Edit, Delete, PersonAdd, Block, Check } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";

import {NewUser} from "./newUser";
import Button from "@material-ui/core/Button";
import * as authActions from "../../../store/actions/authActions";
import {DisabledUser} from "./disabledUser";
import Fab from "@material-ui/core/Fab";


export const ListUsers = () => {

    let data = [
        {
        userId: 1,
        usuario: 'usuario 1',
        contraseña: '123456789',
        firstName: 'Pepe Tony',
        lastname: 'Seminario',
        rol: 'Admin',
        isActive: true
        }, {
        userId: 2,
        usuario: 'usuario 2',
        contraseña: '123456789',
        firstName: 'Daniel',
        lastname: 'Guevara',
        rol: 'Admin',
        isActive: true
        }, {
        userId: 3,
        usuario: 'usuario 3',
        contraseña: '123456789',
        firstName: 'Martha',
        lastname: 'I dont know',
        rol: 'Infectmin',
        isActive: false
        }, {
        userId: 4,
        usuario: 'usuario 4',
        contraseña: '123456789',
        firstName: 'Lorena',
        lastname: 'Valera',
        rol: 'coshita',
        isActive: true
        }
    ];

    const [listUsers, setListUsers] = useState(null);

    const [userSelected, setUserSelect] = useState({ usuario: '', firstName: '', lastName: '' });

    const [actualAction, setActualAction] = useState(0);

    const setUserEdit = (userSelected) => {
        setActualAction(2);
        setUserSelected(userSelected);
    }

    const setUserDisabled = (userSelected) => {
        setActualAction(3);
        setUserSelected(userSelected);
    }

    const setUserEnabled = (userSelected) => {
        setActualAction(4);
        setUserSelected(userSelected);
    }

    const setUserSelected = (userSelected) => {
        setUserSelect({
            userId: userSelected.user_id,
            user: userSelected.user_us,
            firstName: userSelected.first_name,
            lastName: userSelected.last_name,
            role: userSelected.client_id
        })
    }

    const setAddUser = () => {
        setActualAction(1);
        // handleInputChange({usuario: userSelected.usuario, firstName: userSelected.firstName, lastname: userSelected.lastname});
    }

    const [user, setUser] = useState({nombre: '', email: ''});

    const valueUser = ( { name, value } ) => {
        setUser(()=>{
            return {[name]: value}
        })
    }

    const [count, setCount] = useState(0);

    useEffect(()=>{
       getData()
    },[count]);

    const getData = async () => {
        let getListUsers = await authActions.GetAllUsers();
        setListUsers(getListUsers.users);

        if(count===0) setCount(1);
    }

    const clientSelect = (id) => {

        switch (id) {
            case 1: return 'Administrador';
            case 2: return 'Inspector';
            case 3: return 'Cliente';
        }

    }

    return (

    <div className={'user-admin-main-content'}>
        <Grid container>
            <Grid item xs={8} className={`left-section`}>
            <div className={'list-user-title wi-m'}>
            LISTA DE USUARIOS
            </div>
            <div className={`table-content-scroll`}>
                <table className={'table-users'}>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Usuario</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>

            {
                listUsers?.map(
            (item, index) =>
                <tr key={index} className={`status-${item.is_active}`}>
                    <td className={`td-item-name`}>{item.first_name} {item.last_name}</td>
                    <td className={`td-item`}>{item.user_us}</td>
                    <td className={`td-item`}>{clientSelect(item.client_id)}</td>
                    <td className={`td-item`}><div className={`non-selectable status-color-${item.is_active}`}>{(item.is_active)?'Activo':'Inactivo'}</div></td>
                    <td className={`td-item centered`}>
                    {item.is_active ?<div>
                        <IconButton color="primary" aria-label="upload picture" component="span" onClick={()=>{setUserEdit(item)}}>
                            <Edit fontSize="small"/>
                        </IconButton>
                        {/*<IconButton color="primary" aria-label="upload picture" component="span" onClick={()=>{setUserDelete(item)}}>*/}
                        {/*    <Delete fontSize="small" />*/}
                        {/*</IconButton>*/}
                        <IconButton color="primary" aria-label="upload picture" component="span" onClick={()=>{setUserDisabled(item)}}>
                            <Block fontSize="small" />
                        </IconButton></div> :
                        <IconButton color="primary" aria-label="upload picture" component="span" onClick={()=>{setUserEnabled(item)}}>
                            <Check fontSize="small" />
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
                                <IconButton color="primary" component="span" onClick={()=>{setAddUser()}}>
                                <PersonAdd/>
                                </IconButton> :
                            <div style={{height: 48}}/>

                    }

                </div>

                {
                    (actualAction === 0) ?
                        <div className={'icon-add-user'}>
                            <Fab color="primary" aria-label="add" onClick={()=>{setAddUser()}}>
                                <PersonAdd fontSize="large"/>
                            </Fab>
                        </div> :
                    (actualAction === 1) ?
                        <div>
                            <div className={'list-user-title'}>Nuevo usuario</div>
                            <NewUser onClicGetData={getData} action={'new'}/>
                        </div> :
                    (actualAction === 2) ?
                        <div>
                            <div className={'list-user-title'}>Actualizar usuario</div>
                            <NewUser userEdit={userSelected} onClicGetData={getData} action={'edit'}/>
                        </div> :
                    (actualAction === 3) ?
                        <DisabledUser userSelected={userSelected} action={false} onClicGetData={getData} /> :
                    (actualAction === 4) ?
                        <DisabledUser userSelected={userSelected} action={true}  onClicGetData={getData} /> :

                     <div> Crear nuevo usuario</div>
                }


                <br/>
            </Grid>
        </Grid>
    </div>

    );


}
