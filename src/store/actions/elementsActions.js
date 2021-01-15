
export const GetAllElements = async () => {
    const url = `http://127.0.0.1:3003/api/v1/elements/getelements`;
    const res = await fetch(url, {
        method: 'GET'})

    let data = await res.json();

    return data;

}


export const PostNewElement = async (newElement) => {

    const url = `http://127.0.0.1:3003/api/v1/elements/newelement`;

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ newElement })
    })

    let data = await res.json()

    return data;
};

export const PutEditElement = async (editElement, elementId) => {

    const url = `http://127.0.0.1:3003/api/v1/elements/update`;

    const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ editElement, elementId })
    })

    let data = await res.json()

    return data;
};

export const PutDisabledElement = async (status, elementId) => {

    const url = `http://127.0.0.1:3003/api/v1/elements/disabled`;

    const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, elementId })
    })

    let data = await res.json()

    return data;
};
