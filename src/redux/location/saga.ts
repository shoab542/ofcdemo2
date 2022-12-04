import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// helpers
import {
    getCountry as getCountryApi,    
    getCity as getCityApi,    
} from '../../helpers';

interface LocationData {
    payload: {
        id: number;
        name: string;
        country: any;
    };
    type: string;
}

function* getCountry({ payload: {}}:LocationData):SagaIterator {
    try {
        const response = yield call(getCountryApi,{});
        const data = response.data;
        yield put({type: 'GET_COUNTRY_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_COUNTRY_FAILED', error: error});
        
    }
}

function* getCity({ payload: {country}}:LocationData):SagaIterator {
    try {
        if (country!=='' && country!==null){
            const response = yield call(getCityApi,{country});
            const data = response.data;
            yield put({type: 'GET_CITY_SUCCESS' , data: data});
        }
        else{
            yield put({type: 'GET_CITY_FAILED', error: "No country selected"});
        }
    } catch (error) {
        yield put({type: 'GET_CITY_FAILED', error: error});
        
    }
}



export function* watchGetCountry() {
    yield takeEvery('GET_COUNTRY_REQUESTED', getCountry);
}

export function* watchGetCity() {
    yield takeEvery('GET_CITY_REQUESTED', getCity);
}


function* locationSaga() {
    yield all([fork(watchGetCountry),fork(watchGetCity)]);
}



export default locationSaga;
