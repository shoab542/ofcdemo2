import * as type from './types';


interface ServiceForm {
    service: any[];
}

export const getService = (limit:number,page:number) => ({
    type: type.GET_SERVICE_REQUESTED,
    payload: {limit,page},
});

export const getContactService = (contact_id:number) => ({
    type: type.GET_CONTACTSERVICE_REQUESTED,
    payload: {contact_id},
});

export const addService = (service: ServiceForm) => ({
    type: type.ADD_SERVICE_REQUESTED,
    payload: service,
});

