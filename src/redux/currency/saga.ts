import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// helpers
import {
    getCurrency as getCurrencyApi,        
} from '../../helpers';



function* getCurrency():SagaIterator {
    try {
        const response = yield call(getCurrencyApi);
        const data = response.data;
        yield put({type: 'GET_CURRENCY_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_CURRENCY_FAILED', error: error});
        
    }
}




export function* watchGetCurrency() {
    yield takeEvery('GET_CURRENCY_REQUESTED', getCurrency);
}





function* currencySaga() {
    yield all([fork(watchGetCurrency)]);
}

export default currencySaga;
