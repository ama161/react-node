const ROUTE = '/api/class';

const headers = new Headers({
    'Content-Type': 'application/json'
});

export function get(){
    let idCenter = '';
    const route = ROUTE + '/' + idCenter;
    const request = new Request(route, {
        method: 'GET',
        mode: 'same-origin',
        credentials: 'same-origin',
        headers: headers
    });

    return new Promise((resolve, reject) => {
    fetch(request)
        .then((response) => {
            if(!response.ok) {
                throw response.json();
            }
            return response.json();
            })
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                error.then(error => reject(error))
            })
    });
}