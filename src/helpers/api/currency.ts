import { APICore } from './apiCore';

const api = new APICore();


function getCurrency() {
    const baseUrl = '/api/currency/';
    return api.get(`${baseUrl}`,{});
}


export { getCurrency };
