import {getByRole} from '../services/user'

export function userByRole(){
    return new Promise((resolve, reject) => {    
        if(sessionStorage.hasOwnProperty('idUser')){
            getByRole(sessionStorage.idUser, 'admin')
                .then(result => {
                    if(result[0] && result[0].hasOwnProperty('id_admin'))     
                        resolve('admin');
                    else{                              
                        getByRole(sessionStorage.idUser, 'teacher')
                        .then(result => {  
                            if(result[0].hasOwnProperty('id_teacher'))     
                                resolve('teacher');
                            else{
                                reject();
                            }
                        })
                        .catch(err => {
                            reject();
                        })
                    }
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