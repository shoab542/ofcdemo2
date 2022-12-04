import { APICore } from './apiCore';

const api = new APICore();


function getContact(params: {limit: number,page:number}) {
    const baseUrl = '/api/contact/';
    return api.get(`${baseUrl}`,params);
}

function getContactDetails(params:any) {
    const baseUrl = `/api/contact/${params.payload}`;
    return api.get(`${baseUrl}`,null);
}

function getContactInvoice(params:any) {
    const baseUrl = `/api/invoice?contact_id=${params.id}&limit=${params.limit}&page=${params.page}`;
    return api.get(`${baseUrl}`,null);
}

function getContactInvoiceSetting(params:any) {
    const baseUrl = `/api/invoice-setting?contact_id=${params.payload}`;
    return api.get(`${baseUrl}`,null);
}

function updateContactInvoiceSetting(params:any) {
    const baseUrl = `/api/invoice-setting/`;
    return api.create(`${baseUrl}`,params.payload);
}

function getAllContact() {
    const baseUrl = '/api/contact/';
    return api.get(`${baseUrl}`,{});
}

function addContact(params: { name:string,client_id:string,contact_type:string,contact_person:string,phone:string,email:string,city:string,country:string,billing_address:string }) {
    const baseUrl = '/api/contact/';
    return api.create(`${baseUrl}`,params);
}

function deleteContact(id:number) {
    const baseUrl = `/api/contact/${id}/`;
    return api.delete(`${baseUrl}`);
}


export { getContact, addContact,deleteContact,getAllContact, getContactInvoice, getContactDetails, getContactInvoiceSetting, updateContactInvoiceSetting };
