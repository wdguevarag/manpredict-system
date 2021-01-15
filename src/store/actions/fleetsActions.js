
export const GetAllFleets = async () => {
    const url = `http://127.0.0.1:3003/api/v1/fleets/getfleets`;
    const res = await fetch(url, {
        method: 'GET'})

    let data = await res.json();

    return data;

}


export const PostNewFleet = async (newFleet) => {

    const url = `http://127.0.0.1:3003/api/v1/fleets/newfleet`;

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ newFleet })
    })

    let data = await res.json()

    return data;
};

export const PutEditFleet = async (editFleet, fleetId) => {

    const url = `http://127.0.0.1:3003/api/v1/fleets/update`;

    const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ editFleet, fleetId })
    })

    let data = await res.json()

    return data;
};

export const PutDisabledFleet = async (status, fleetId) => {

    const url = `http://127.0.0.1:3003/api/v1/fleets/disabled`;

    const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, fleetId })
    })

    let data = await res.json()

    return data;
};

export const GetAllFleetsToSelect = async () => {
    const url = `http://127.0.0.1:3003/api/v1/fleets/getfleets/toselect`;
    const res = await fetch(url, {
        method: 'GET'})

    let data = await res.json();

    return data;

}
