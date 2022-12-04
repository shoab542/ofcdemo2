import * as type from './types';


export const getChartAccount = (limit:number,page:number) => ({
    type: type.GET_CHARTACCOUNT_REQUESTED,
    payload: {limit,page},
});


export const addChartOfAccount  = (formData: any) => ({
    type: type.ADD_CHART_OF_ACCOUNT_REQUESTED,
    payload: formData,
});


export const setChartOfAccountSuccessAlert = (msg:string) => ({
    type: type.SET_CHART_OF_ACCOUNT_SUCCESS_ALERT,
    payload: msg,
});


export const setChartOfAccountErrorAlert = (msg:string) => ({
    type: type.SET_CHART_OF_ACCOUNT_ERROR_ALERT,
    payload: msg,
});
