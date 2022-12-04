import * as type from './types';



export const getCountry = () => ({
    type: type.GET_COUNTRY_REQUESTED,
    payload: {},
});

export const getCity = (country:number) => ({
    type: type.GET_CITY_REQUESTED,
    payload: {country},
});

