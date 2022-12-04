import * as type from './types';


export const getRepeatingInvoice = (limit:number,page:number) => ({
    type: type.GET_REPEATINGINVOICE_REQUESTED,
    payload: {limit,page},
});

export const getRepeatingInvoiceDetails = (id:number) => ({
    type: type.GET_REPEATINGINVOICEDETAILS_REQUESTED,
    payload: id,
});




