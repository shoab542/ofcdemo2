import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// helpers
import {
    getRole as getRoleApi,
    getUserRole as getUserRoleApi,
        
} from '../../helpers';

interface RoleData {
    payload: {
        limit: any;
        page: any;
    };
    type: string;
}

function* getRole({ payload: {limit,page}}:RoleData):SagaIterator {
    try {
        const response = yield call(getRoleApi,{limit,page});
        const data = response.data;
        yield put({type: 'GET_ROLE_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_ROLE_FAILED', error: error});
        
    }
}

function* getUserRole():SagaIterator {
    try {
        const response = yield call(getUserRoleApi);
        const roles = response.data;
        yield put({type: 'GET_USERROLE_SUCCESS' , user_role: roles.permissions});
    } catch (error) {
        yield put({type: 'GET_USERROLE_FAILED', error: error});
        
    }
}




export function* watchGetRole() {
    yield takeEvery('GET_ROLE_REQUESTED', getRole);
}

export function* watchGetUserRole() {
    yield takeEvery('GET_USERROLE_REQUESTED', getUserRole);
}



function* roleSaga() {
    yield all([fork(watchGetRole),fork(watchGetUserRole)]);
}

export default roleSaga;
