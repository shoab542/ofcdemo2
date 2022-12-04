import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// helpers
import {
    getService as getServiceApi,
    getContactService as getContactServiceApi,
    addService as addServiceApi,
    
} from '../../helpers';

interface ServiceData {
    payload: {
        id: number;
        service: any[];
        limit: number;
        page: number;
        contact_id: number;
    };
    type: string;
}

function* getService({ payload: {limit,page}}:ServiceData):SagaIterator {
    try {
        const response = yield call(getServiceApi,{limit,page});
        const data = response.data;
        yield put({type: 'GET_SERVICE_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_SERVICE_FAILED', error: error});
        
    }
}

function* getContactService({ payload: {contact_id}}:ServiceData):SagaIterator {
    try {
        const response = yield call(getContactServiceApi,{contact_id});
        const data = response.data;
        yield put({type: 'GET_CONTACTSERVICE_SUCCESS' , data: data.results});
    } catch (error) {
        yield put({type: 'GET_CONTACTSERVICE_FAILED', error: error});
        
    }
}



function* addService({ payload: {service} }: ServiceData):SagaIterator {
    console.log(service)
    try {
        const response = yield call(addServiceApi,{service});
        const result = response.data;
        
        if(result.success){
            yield put({type: 'ADD_SERVICE_SUCCESS' , contact: result.data});
        }else{
            yield put({type: 'ADD_SERVICE_FAILED', error: result.error});
        }
        
    } catch (error) {
        yield put({type: 'ADD_SERVICE_FAILED', error: error});
        
    }
}



export function* watchGetService() {
    yield takeEvery('GET_SERVICE_REQUESTED', getService);
}

export function* watchGetContactService() {
    yield takeEvery('GET_CONTACTSERVICE_REQUESTED', getContactService);
}



export function* watchAddService() {
    yield takeEvery('ADD_SERVICE_REQUESTED', addService);
}



function* serviceSaga() {
    yield all([fork(watchGetService),fork(watchAddService),fork(watchGetContactService)]);
}

export default serviceSaga;
