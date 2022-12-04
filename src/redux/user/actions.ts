import * as type from './types';


interface UserData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    groups: any;
    is_active: boolean;
}

export const getUser = (limit:number,page:number) => ({
    type: type.GET_USER_REQUESTED,
    payload: {limit,page},
});



export const addUser = (formData: UserData) => ({
    type: type.ADD_USER_REQUESTED,
    payload: formData,
});

export const setUserSuccessAlert = (msg:string) => ({
    type: type.SET_USER_SUCCESS_ALERT,
    payload: msg,
});

export const setUserErrorAlert = (msg:string) => ({
    type: type.SET_USER_ERROR_ALERT,
    payload: msg,
});


