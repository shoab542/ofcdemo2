import { APICore } from './apiCore';

const api = new APICore();


function getRole(params: {limit: any,page:any}) {

    const baseUrl = '/api/groups';
    if(params.limit !== null && params.page !== null){
        return api.get(`${baseUrl}`,params);
    }
    return api.get(`${baseUrl}`,{});
}

function getUserRole() {
    const baseUrl = '/api/user_role';
    return api.get(`${baseUrl}`,{});
}



export { getRole,getUserRole };
