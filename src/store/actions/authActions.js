import * as types from '../types/authTypes';

export const SetUser = async (dispatch, user) => {

    const url = `http://127.0.0.1:3003/api/v1/auth/login`;
    //const url = 'http://econtent.ms4m.com:3010/api/v1/auth/login/';
    // const res = await axios.request({
    //     method: `POST`,
    //     url: url,
    //     data: { userName: user.username, pass: user.password },
    //     headers: {
    //         'Accept': 'application/json', 'Content-Type': 'application/json'
    //     }
    // });

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: user.username, pass: user.password })
    })

    let data = await res.json()

    if(data.response.success){
        try {
            dispatch({
                type: types.LOGIN,
                payload: user.username
            })
        } catch (error) {
            console.error(error);
        }
    }

    return data;
};



export const PostNewUser = async (newUser) => {

    const url = `http://127.0.0.1:3003/api/v1/auth/register`;

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ newUser })
    })

    let data = await res.json()

    return data;
};


export const PutEditUser = async (editUser, checkPass, userId) => {

    const url = `http://127.0.0.1:3003/api/v1/auth/update`;

    const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ editUser, checkPass, userId })
    })

    let data = await res.json()

    return data;
};

export const PutDisabledUser = async (status, userId) => {

    const url = `http://127.0.0.1:3003/api/v1/auth/disabled`;

    const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, userId })
    })

    let data = await res.json()

    return data;
};

export const GetAllUsers = async () => {
    const url = `http://127.0.0.1:3003/api/v1/auth/getusers`;
    const res = await fetch(url, {
        method: 'GET'})

    let data = await res.json();

    return data;

}
