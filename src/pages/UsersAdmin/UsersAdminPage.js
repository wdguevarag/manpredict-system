import React from "react";

import {ListUsers} from "../../components/userAdminComponents/listUsers/listUsers";

import "./styles.css";

export const UsersAdmin = () => {



    return (

        <>

            <div className={`title-page`}>USERS ADMINISTRATION </div>

            <ListUsers/>



        </>

    );


}
