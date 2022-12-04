import { APICore } from './apiCore';

const api = new APICore();


function getService(params: {limit: number,page:number}) {
    const baseUrl = '/api/service/';
    return api.get(`${baseUrl}`,params);
}

function getContactService(params: {contact_id:number}) {
    const baseUrl = '/api/service/';
    return api.get(`${baseUrl}`,params);
}

function addService(params: { service: any[] }) {
    const baseUrl = '/api/service/';
    return api.create(`${baseUrl}`,params);
}



export { getService, getContactService, addService };
