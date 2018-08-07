const ROUTE = '/api/dossier';

const headers = new Headers({
    'Content-Type': 'application/json'
});

export function get(){
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

export function post(id_student, id_teacher, newDossier){
    const route = ROUTE + '/' + id_student + '/' + id_teacher;
    console.log(route);
    const request = new Request(route, {
        method: 'POST',
        mode: 'same-origin',
        body: JSON.stringify(newDossier),
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