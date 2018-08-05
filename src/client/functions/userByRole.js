import {getByRole} from '../services/user'

export function userByRole(){
    return new Promise((resolve, reject) => {    
        if(sessionStorage.hasOwnProperty('idUser')){
            getByRole(sessionStorage.idUser, 'admin')
                .then(result => {                 
                    resolve(true);
                })
                .catch(err => {
                    reject();
                })
        }
        else{
            reject();
        }
    })
}