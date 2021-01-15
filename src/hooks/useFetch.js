import { useState } from 'react';
import CONSTANTES from '../constant/const';
import CONFIG from '../config';


export const useFetch = (api, type, body = null) => {
    console.log(api,type,body)

    const [state, setstate] = useState({ data: null, loading: true, error: null });

   
        switch (type) {
            case CONSTANTES.HTTP.GET:
                fetch(`${CONFIG.API_URL}${api}`)
                    .then(
                        resp => resp.json()
                    ).then(
                        data => {
                            setstate({ loading: false, error: null, data });
                        }
                    );


                break;
            case CONSTANTES.HTTP.POST:
                console.log('',`${CONFIG.API_URL}${api}`)
                fetch(`${CONFIG.API_URL}${api}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
                    .then(
                        resp => resp.json()
                    ).then(
                        data => {
                            setstate({ loading: false, error: null, data });
                        }
                    );

                break;
            default:
                break;
        }


    return state;

}
