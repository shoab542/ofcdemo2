import { APICore } from './apiCore';

const api = new APICore();


function getUser(params: {limit: number,page:number}) {
    const baseUrl = '/api/users/';
    return api.get(`${baseUrl}`,params);
}

function addUser(params: { first_name:string;last_name:string;email:string;password:string;phone:string;groups:number[];is_active:boolean }) {
    const baseUrl = '/api/users/';
    return api.create(`${baseUrl}`,params);
}


export { getUser, addUser };
