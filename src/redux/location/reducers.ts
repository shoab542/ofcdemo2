import * as type from './types';

const INIT_STATE = {
    country: [],
    city: [],
    loading: false,
    error: null,
};



const Location = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case type.GET_COUNTRY_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_COUNTRY_SUCCESS: {
            return {
                ...state,
                loading: false,
                country: action.data,
            };
        }
        case type.GET_COUNTRY_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case type.GET_CITY_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_CITY_SUCCESS: {
            return {
                ...state,
                loading: false,
                city: action.data,
            };
        }
        case type.GET_CITY_FAILED: {
            return {
                ...state,
                loading: false,
                city: [],
                error: action.error,
            };
        }

               
                
        default:
            return state;
    }
};

export default Location;
