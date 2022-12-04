import { APICore } from './apiCore';

const api = new APICore();


function getCountry(params: {}) {
    const baseUrl = '/api/countries/';
    return api.get(`${baseUrl}`,params);
}

function getCity(params: {country:number}) {
    const baseUrl = '/api/cities';
    return api.get(`${baseUrl}`,params);
}




export { getCountry,getCity };
