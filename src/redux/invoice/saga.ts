import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// helpers
import {
    getInvoice as getInvoiceApi,    
    getInvoiceDetails as getInvoiceDetailsApi,    
} from '../../helpers';

interface InvoiceData {
    payload: {
        id: number;
        limit: number;
        page: number;
    };
    type: string;
}

function* getInvoice({ payload: {limit,page}}:InvoiceData):SagaIterator {
    try {
        const response = yield call(getInvoiceApi,{limit,page});
        const data = response.data;
        yield put({type: 'GET_INVOICE_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_INVOICE_FAILED', error: error});
        
    }
}

function* getInvoiceDetails({ payload }:InvoiceData):SagaIterator {
    try {
        const response = yield call(getInvoiceDetailsApi,{payload});
        const data = response.data;
        yield put({type: 'GET_INVOICEDETAILS_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_INVOICEDETAILS_FAILED', error: error});
        
    }
}


export function* watchGetInvoice() {
    yield takeEvery('GET_INVOICE_REQUESTED', getInvoice);
}

export function* watchGetInvoiceDetails() {
    yield takeEvery('GET_INVOICEDETAILS_REQUESTED', getInvoiceDetails);
}



function* invoiceSaga() {
    yield all([fork(watchGetInvoice),fork(watchGetInvoiceDetails)]);
}

export default invoiceSaga;
