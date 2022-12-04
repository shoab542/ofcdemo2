import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// helpers
import {
    getChartAccount as getChartAccountApi,        
    addChartOfAccount as addChartOfAccountApi,        
} from '../../helpers';



function* getChartAccount({ payload: {limit,page}}:any):SagaIterator {
    try {
        const response = yield call(getChartAccountApi,{limit,page});
        const data = response.data;
        yield put({type: 'GET_CHARTACCOUNT_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_CHARTACCOUNT_FAILED', error: error});
        
    }
}


function* addChartOfAccount({ payload: {account_name,code,account_type,details,transaction_type} }: any):SagaIterator {
    
    try {
        const response = yield call(addChartOfAccountApi,{account_name,code,account_type,details,transaction_type});
        const result = response.data;
        
        if(result.success){
            yield put({type: 'ADD_CHART_OF_ACCOUNT_SUCCESS' , account: result.data});
        }else{
            yield put({type: 'ADD_CHART_OF_ACCOUNT_FAILED', error: result.error});
        }
        
    } catch (error) {
        yield put({type: 'ADD_CHART_OF_ACCOUNT_FAILED', error: error});
        
    }
}

function* setChartOfAccountSuccessAlert( msg:string) {

    put({type: 'SET_USER_SUCCESS_ALERT',success: msg});
}

function* setChartOfAccountErrorAlert(msg:string) {

    put({type: 'SET_USER_ERROR_ALERT',error: msg});
}






export function* watchGetChartAccount() {
    yield takeEvery('GET_CHARTACCOUNT_REQUESTED', getChartAccount);
}


export function* watchAddChartOfAccount() {
    yield takeEvery('ADD_CHART_OF_ACCOUNT_REQUESTED', addChartOfAccount);
}



function* charAccountSaga() {
    yield all([fork(watchGetChartAccount), fork(watchAddChartOfAccount), setChartOfAccountSuccessAlert, setChartOfAccountErrorAlert]);
}

export default charAccountSaga;
