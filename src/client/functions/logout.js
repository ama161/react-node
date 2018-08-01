export function logout(){
    sessionStorage.removeItem('idUser');
    sessionStorage.removeItem('token');
}