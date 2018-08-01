import {get} from '../services/user'

export function userByRole(){
    console.log(sessionStorage.hasOwnProperty('idUser'));
    if(sessionStorage.hasOwnProperty('idUser')){
        console.log('aqui')
        return new Promise((resolve, reject) => {
            get(sessionStorage.idUser)
            .then(result => {
                console.log(result)
                if(result[0].role === 'admin'){
                    resolve('admin');
                }
                resolve('');
            })
            .catch(err => console.log(err))
        })
    }
}