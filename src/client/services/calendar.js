const ROUTE = '/api/calendar';

const headers = new Headers({
    'Content-Type': 'application/json',
    'authorization': sessionStorage.token
});

export function getByTeacherByDate(teacherId, date){
    const route = ROUTE + '/teacher/' + teacherId + '/date/' + date;
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

export function getByTeacher(teacherId){
    const route = ROUTE + '/teacher/' + teacherId;
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

export function getByStudent(studentId){
    const route = ROUTE + '/student/' + studentId;    
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

export function getByParent(parentId){
    const route = ROUTE + '/parent/' + parentId;    
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

export function postAssistance(newAssistance){
    const request = new Request(ROUTE, {
        method: 'POST',
        mode: 'same-origin',
        body: JSON.stringify(newAssistance),
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

export function putAssistance(description){
    const request = new Request(ROUTE, {
        method: 'PUT',
        mode: 'same-origin',
        body: JSON.stringify({description: description}),
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