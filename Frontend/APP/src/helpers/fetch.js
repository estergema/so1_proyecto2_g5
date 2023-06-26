const baseUrl = 'http://localhost:5000';
const baseUrl2 = 'http://localhost:8000';

export const fetchAPI = async(enpoint,method = 'GET') => {
    
    const url = `${baseUrl}/${enpoint}`;

    if(method === 'GET'){
        const resp = await fetch(url);
        return await resp.json();
    }else{
        const resp = await fetch(url, {
            method,
            headers:{
                'Content-type': 'application/json'
            },
            //body: JSON.stringify(data)
        })
        return await resp.json()
    }

}

export const fetchAPI2 = async(enpoint,method = 'GET') => {
    
    const url = `${baseUrl2}/${enpoint}`;

    if(method === 'GET'){
        const resp = await fetch(url);
        return await resp.json();
    }else{
        const resp = await fetch(url, {
            method,
            headers:{
                'Content-type': 'application/json'
            },
            //body: JSON.stringify(data)
        })
        return await resp.json()
    }

}
