import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// helpers
import {
    getContact as getContactApi,
    getContactInvoice as getContactInvoiceApi,
    getContactInvoiceSetting as getContactInvoiceSettingApi,
    updateContactInvoiceSetting as updateContactInvoiceSettingApi,
    getContactDetails as getContactDetailsApi,
    getAllContact as getAllContactApi,
    addContact as addContactApi,
    deleteContact as deleteContactApi
    
} from '../../helpers';

interface ContactData {
    payload: {
        id: number;
        name: string;
        client_id: string;
        contact_type: string;
        contact_person: string;
        phone: string;
        email: string;
        city: string;
        country: string;
        billing_address: string;
        limit: number;
        page: number;
    };
    type: string;
}

function* getContact({ payload: {limit,page}}:ContactData):SagaIterator {
    try {
        const response = yield call(getContactApi,{limit,page});
        const data = response.data;
        yield put({type: 'GET_CONTACT_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_CONTACT_FAILED', error: error});
        
    }
}


function* getContactInvoice({ payload }:any):SagaIterator {
    try {
        const response = yield call(getContactInvoiceApi,{...payload});
        const data = response.data;
        // console.log("data",data)

        yield put({type: 'GET_CONTACT_INVOICE_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_CONTACT_INVOICE_FAILED', error: error});
        
    }
}


function* getContactInvoiceSetting({ payload }:ContactData):SagaIterator {
    try {
        const response = yield call(getContactInvoiceSettingApi,{payload});
        const data = response.data;
        yield put({type: 'GET_CONTACT_INVOICE_SETTING_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_CONTACT_INVOICE_SETTING_FAILED', error: error});
        
    }
}


function* updateContactInvoiceSetting({ payload }:any):SagaIterator {
    try {
        const response = yield call(updateContactInvoiceSettingApi,{payload});
        const data = response.data;
        if(data.success){
            yield put({type: 'UPDATE_CONTACT_INVOICE_SETTING_SUCCESS' , data: data.data});
        }else{
            yield put({type: 'UPDATE_CONTACT_INVOICE_SETTING_FAILED', error: data.error});
        }
    } catch (error) {
        console.log("error",error)
        yield put({type: 'UPDATE_CONTACT_INVOICE_SETTING_FAILED', error: error});
        
    }
}


function* getContactDetails({ payload }:ContactData):SagaIterator {
    try {
        const response = yield call(getContactDetailsApi,{payload});
        const data = response.data;
        yield put({type: 'GET_CONTACT_DETAILS_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_CONTACT_DETAILS_FAILED', error: error});
        
    }
}



function* getAllContact():SagaIterator {
    try {
        const response = yield call(getAllContactApi);
        const data = response.data;
        yield put({type: 'GET_ALLCONTACT_SUCCESS' , data: data.results});
    } catch (error) {
        yield put({type: 'GET_ALLCONTACT_FAILED', error: error});
        
    }
}



function* addContact({ payload: {name,client_id,contact_type,contact_person,phone,email,city,country,billing_address} }: ContactData):SagaIterator {
    
    try {
        const response = yield call(addContactApi,{name,client_id,contact_type,contact_person,phone,email,city,country,billing_address});
        const result = response.data;
        if(result.success){
            yield put({type: 'ADD_CONTACT_SUCCESS' , contact: result.data});
        }else{
            yield put({type: 'ADD_CONTACT_FAILED', error: result.error});
        }
        
    } catch (error) {
        yield put({type: 'ADD_CONTACT_FAILED', error: error});
        
    }
}

function* deleteContact({ payload: {id} }: ContactData):SagaIterator {
    try {
        console.log(id)
        const response = yield call(deleteContactApi,id);
        const result = response.data;
        if(result.success){
            yield put({type: 'DELETE_CONTACT_SUCCESS' , id: id});
        }else{
            yield put({type: 'DELETE_CONTACT_FAILED', error: result.error});
        }
        
    } catch (error) {
        yield put({type: 'DELETE_CONTACT_FAILED', error: error});
        
    }
}


function* setContactSuccessAlert( msg:string) {

    put({type: 'SET_CONTACT_SUCCESS_ALERT',success: msg});
}

function* setContactErrorAlert(msg:string) {

    put({type: 'SET_CONTACT_ERROR_ALERT',error: msg});
}


export function* watchGetContact() {
    yield takeEvery('GET_CONTACT_REQUESTED', getContact);
}


export function* watchGetContactInvoice() {
    yield takeEvery('GET_CONTACT_INVOICE_REQUESTED', getContactInvoice);
}

export function* watchGetContactInvoiceSetting() {
    yield takeEvery('GET_CONTACT_INVOICE_SETTING_REQUESTED', getContactInvoiceSetting);
}

export function* watchUpdateContactInvoiceSetting() {
    yield takeEvery('UPDATE_CONTACT_INVOICE_SETTING_REQUESTED', updateContactInvoiceSetting);
}

export function* watchGetContactDetails() {
    yield takeEvery('GET_CONTACT_DETAILS_REQUESTED', getContactDetails);
}


export function* watchGetAllContact() {
    yield takeEvery('GET_ALLCONTACT_REQUESTED', getAllContact);
}



export function* watchAddContact() {
    yield takeEvery('ADD_CONTACT_REQUESTED', addContact);
}

export function* watchDeleteContact() {
    yield takeEvery('DELETE_CONTACT_REQUESTED', deleteContact);
}



function* contactSaga() {
    yield all([fork(watchGetContact),fork(watchAddContact),fork(watchDeleteContact),fork(watchGetAllContact), fork(watchGetContactInvoice), fork(watchGetContactDetails), fork(watchGetContactInvoiceSetting), fork(watchUpdateContactInvoiceSetting),setContactSuccessAlert,setContactErrorAlert]);
}

export default contactSaga;
