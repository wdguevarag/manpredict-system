import axios from "axios";

export const GetClients = async (dispatch, user) => {

    const url = `http://127.0.0.1:8056/datecsoft/api/manpredict/v1/clients`;

    const res = await axios.request({ method: `GET`, url: url });

    return res.data;
};

export const GetAreas = async (clientId, dispatch, user) => {

    const url = `http://127.0.0.1:8056/datecsoft/api/manpredict/v1/areas`;

    const res = await axios.request({ method: `GET`, url: url, params: { clientId: clientId } });

    return res.data;
};
