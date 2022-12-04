import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import config from '../../config';
// apicore
import { APICore, setAuthorization } from '../../helpers/api/apiCore';

// helpers
import {
    login as loginApi,
    signup as signupApi,
    updateProfile as updateProfileApi,
    updateProfileImage as updateProfileImageApi,
} from '../../helpers/';

// actions
import { authApiResponseSuccess, authApiResponseError } from './actions';

// constants
import { AuthActionTypes } from './constants';

interface UserData {
    payload: {
        email: string;
        phone: string;
        password: string;
        first_name: string;
        last_name: string;
        profile_image: File;
    };
    type: string;
}

const api = new APICore();

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* login({ payload: { email, password }, type }: UserData): SagaIterator {
    try {
        const response = yield call(loginApi, { email, password });
        const result = response.data;
        // NOTE - You can change this according to response format from your api
        
        if(result.success){
            api.setLoggedInUser(result.data);
            setAuthorization(result.data.access);
            yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, result.data));
        }else{
            yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, result.error));
            api.setLoggedInUser(null);
            setAuthorization(null);
        }
        
    } catch (error: any) {
        yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
        api.setLoggedInUser(null);
        setAuthorization(null);
    }
}

/**
 * Logout the user
 */
function* logout(): SagaIterator {
    try {
        api.setLoggedInUser(null);
        setAuthorization(null);
        yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}));
    } catch (error: any) {
        yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error));
    }
}

function* signup({ payload: { first_name,last_name, email, phone, password } }: UserData): SagaIterator {
    try {
        const response = yield call(signupApi, { first_name,last_name, email, phone, password });
        const user = response.data;
        // api.setLoggedInUser(user);
        // setAuthorization(user['token']);
        yield put(authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, user));
    } catch (error: any) {
        yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, error));
        api.setLoggedInUser(null);
        setAuthorization(null);
    }
}


function* updateProfile({ payload: { first_name,last_name, email, phone } }: UserData): SagaIterator {
    try {
        const response = yield call(updateProfileApi, { first_name,last_name, email, phone });
        const result = response.data
        if(result.success){
            const profile = JSON.parse(localStorage.getItem('ccl_user') || '{}');
            Object.keys({ first_name,last_name, email, phone }).forEach((key) => {
                profile[key] = { first_name,last_name, email, phone }[key];
            });
            localStorage.setItem('ccl_user', JSON.stringify(profile));
            yield put(authApiResponseSuccess(AuthActionTypes.UPDATE_PROFILE, response.data));
        }else{
            yield put(authApiResponseError(AuthActionTypes.UPDATE_PROFILE, result.error));
        }
        
    } catch (error: any) {
        yield put(authApiResponseError(AuthActionTypes.UPDATE_PROFILE, error));
    }
}

function* updateProfileImage({ payload: { profile_image } }: UserData): SagaIterator {
    try {
        const response = yield call(updateProfileImageApi, { profile_image });
        const result = response.data;
        if(result.success){
            const profile = JSON.parse(localStorage.getItem('ccl_user') || '{}');
            profile['profile_image'] = config.API_URL+result.data.profile_image
            localStorage.setItem('ccl_user', JSON.stringify(profile));
            yield put(authApiResponseSuccess(AuthActionTypes.UPDATE_PROFILE_IMAGE, response.data));
        }else{
            yield put(authApiResponseError(AuthActionTypes.UPDATE_PROFILE_IMAGE, result.error));
        }
        
    } catch (error: any) {
        yield put(authApiResponseError(AuthActionTypes.UPDATE_PROFILE_IMAGE, error));
    }
}
export function* watchLoginUser() {
    yield takeEvery(AuthActionTypes.LOGIN_USER, login);
}

export function* watchLogout() {
    yield takeEvery(AuthActionTypes.LOGOUT_USER, logout);
}

export function* watchSignup(): any {
    yield takeEvery(AuthActionTypes.SIGNUP_USER, signup);
}



export function* watchUpdateProfile(): any {
    yield takeEvery(AuthActionTypes.UPDATE_PROFILE, updateProfile);
}

export function* watchUpdateProfileImage(): any {
    yield takeEvery(AuthActionTypes.UPDATE_PROFILE_IMAGE, updateProfileImage);
}

function* authSaga() {
    yield all([fork(watchLoginUser), fork(watchLogout), fork(watchSignup), fork(watchUpdateProfile),fork(watchUpdateProfileImage)]);
}

export default authSaga;
