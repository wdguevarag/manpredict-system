
export const GetAllComponents = async () => {
    const url = `http://127.0.0.1:3003/api/v1/components/getcomponents`;
    const res = await fetch(url, {
        method: 'GET'})

    let data = await res.json();

    return data;

}


export const PostNewComponent = async (newComponent) => {

    const url = `http://127.0.0.1:3003/api/v1/components/newcomponent`;

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ newComponent })
    })

    let data = await res.json()

    return data;
};

export const PutEditComponent = async (editComponent, componentId) => {

    const url = `http://127.0.0.1:3003/api/v1/components/update`;

    const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ editComponent, componentId })
    })

    let data = await res.json()

    return data;
};

export const PutDisabledComponent = async (status, componentId) => {

    const url = `http://127.0.0.1:3003/api/v1/components/disabled`;

    const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, componentId })
    })

    let data = await res.json()

    return data;
};

export const GetAllComponentsToSelect = async () => {
    const url = `http://127.0.0.1:3003/api/v1/components/getcomponents/toselect`;
    const res = await fetch(url, {
        method: 'GET'})

    let data = await res.json();

    return data;

}
