import { APICore } from './apiCore';

const api = new APICore();


function getInvoice(params: {limit: number,page:number}) {
    const baseUrl = '/api/invoice/';
    return api.get(`${baseUrl}`,params);
}

function getInvoiceDetails(params:any) {
    const baseUrl = `/api/invoice/${params.payload}/`;
    return api.get(`${baseUrl}`,null);
}

export { getInvoice,getInvoiceDetails };
