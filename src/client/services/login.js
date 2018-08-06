const ROUTE = '/api/login';

const headers = new Headers({
    'Content-Type': 'application/json'
});

export function login(user){
    const request = new Request(ROUTE, {
        method: 'POST',
        mode: 'same-origin',
        body: JSON.stringify(user),
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