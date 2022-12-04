import * as type from './types';


interface ContactForm {
    name: string;
    client_id: string;
    contact_type: string;
    contact_person: string;
    phone: string;
    email: string;
    city: string;
    country: string;
    billing_address: string;
}

export const getContact = (limit:number,page:number) => ({
    type: type.GET_CONTACT_REQUESTED,
    payload: {limit,page},
});

export const getContactInvoice = (id:any, limit:any, page:any) => ({
    type: type.GET_CONTACT_INVOICE_REQUESTED,
    payload: {id, limit, page},
});

export const getContactInvoiceSetting = (id:number) => ({
    type: type.GET_CONTACT_INVOICE_SETTING_REQUESTED,
    payload: id,
});

export const getContactDetails = (id:number) =>{ 
    return ({
    type: type.GET_CONTACT_DETAILS_REQUESTED,
    payload: id,
});}


export const updateContactInvoiceSetting = (data: any) => ({
    type: type.UPDATE_CONTACT_INVOICE_SETTING_REQUESTED,
    payload: data,
});


export const getAllContact = () => ({
    type: type.GET_ALLCONTACT_REQUESTED,
    payload: {},
});

export const addContact = (formData: ContactForm) => ({
    type: type.ADD_CONTACT_REQUESTED,
    payload: formData,
});

export const deleteContact = (id: number) => ({
    type: type.DELETE_CONTACT_REQUESTED,
    payload: id,
});


export const setContactSuccessAlert = (msg:string) => ({
    type: type.SET_CONTACT_SUCCESS_ALERT,
    payload: msg,
});

export const setContactErrorAlert = (msg:string) => ({
    type: type.SET_CONTACT_ERROR_ALERT,
    payload: msg,
});