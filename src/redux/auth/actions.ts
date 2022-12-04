// constants
import { AuthActionTypes } from './constants';

export interface AuthActionType {
    type:
        | AuthActionTypes.API_RESPONSE_SUCCESS
        | AuthActionTypes.API_RESPONSE_ERROR
        | AuthActionTypes.LOGIN_USER
        | AuthActionTypes.LOGOUT_USER
        | AuthActionTypes.RESET
        | AuthActionTypes.SIGNUP_USER
        | AuthActionTypes.UPDATE_PROFILE
        | AuthActionTypes.UPDATE_PROFILE_IMAGE
    payload: {} | string;
}

interface UserData {
    id: number;
    email: string;
    phone: string;
    password: string;
    first_name: string;
    last_name: string;
    profile_image: File;
    role: string;
    token: string;
}

// common success
export const authApiResponseSuccess = (actionType: string, data: UserData | {}): AuthActionType => ({
    type: AuthActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const authApiResponseError = (actionType: string, error: string): AuthActionType => ({
    type: AuthActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const loginUser = (email: string, password: string): AuthActionType => ({
    type: AuthActionTypes.LOGIN_USER,
    payload: { email, password },
});

export const logoutUser = (): AuthActionType => ({
    type: AuthActionTypes.LOGOUT_USER,
    payload: {},
});

export const signupUser = (first_name: string, last_name: string, email: string,phone: string, password: string): AuthActionType => ({
    type: AuthActionTypes.SIGNUP_USER,
    payload: { first_name,last_name, email,phone, password },
});



export const resetAuth = (): AuthActionType => ({
    type: AuthActionTypes.RESET,
    payload: {},
});

export const UpdateProfile = (formData:UserData): AuthActionType => ({
    type: AuthActionTypes.UPDATE_PROFILE,
    payload: formData,
});

export const UpdateProfileImage = (profile_image:File): AuthActionType => ({
    type: AuthActionTypes.UPDATE_PROFILE_IMAGE,
    payload: profile_image,
});
