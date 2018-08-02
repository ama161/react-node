import {get} from '../services/user'

export function userByRole(){
    console.log(sessionStorage.hasOwnProperty('idUser'));
    return new Promise((resolve, reject) => {
    
        if(sessionStorage.hasOwnProperty('idUser')){
            console.log('aqui')
                get(sessionStorage.idUser)
                .then(result => {
                    console.log(result)
                    if(result[0].role === 'admin'){
                        resolve('admin');
                    }
                    resolve('');
                })
                .catch(err => console.log(err))
        }
        else{
            resolve('');
        }
    })
}