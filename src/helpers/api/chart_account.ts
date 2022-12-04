import { APICore } from './apiCore';

const api = new APICore();


function getChartAccount(params: {limit: number,page:number}) {
    const baseUrl = '/api/account/';
    if(params.limit !== null && params.limit !== undefined && params.page !== null && params.page !== undefined){
        return api.get(`${baseUrl}`,params);
    }
    return api.get(`${baseUrl}`,{});
}

function addChartOfAccount(params:any) {
    const baseUrl = '/api/account/';
    return api.create(`${baseUrl}`,params);
}


export { getChartAccount, addChartOfAccount };
