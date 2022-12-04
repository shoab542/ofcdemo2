import { APICore } from './apiCore';

const api = new APICore();


function getRepeatingInvoice(params: {limit: number,page:number}) {
    const baseUrl = '/api/repeating-invoice/';
    return api.get(`${baseUrl}`,params);
}

function getRepeatingInvoiceDetails(params:any) {
    const baseUrl = `/api/repeating-invoice/${params.payload}/`;
    return api.get(`${baseUrl}`,{});
}

export { getRepeatingInvoice, getRepeatingInvoiceDetails };
