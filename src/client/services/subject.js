const ROUTE = '/api/subject';

const headers = new Headers({
    'Content-Type': 'application/json'
});

export function getAll(){
    const request = new Request(ROUTE, {
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

export function post(newSubject){
    const request = new Request(ROUTE, {
        method: 'POST',
        mode: 'same-origin',
        body: JSON.stringify(newSubject),
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

export function put(newSubject, subjectId){
    let route = ROUTE + '/' + subjectId;    
    const request = new Request(route, {
        method: 'PUT',
        mode: 'same-origin',
        body: JSON.stringify(newSubject),
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

export function get(subjectId){
    let route = ROUTE + '/' + subjectId;
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