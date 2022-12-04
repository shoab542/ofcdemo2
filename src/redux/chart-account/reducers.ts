import * as type from './types';

const INIT_STATE = {
    accounts: [],
    previous: '',
    next: '',
    current_page: '',
    total_page: '',
    active: '',
    loading: false,
    error: null,
    success: '',
};



const ChartAccount = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case type.GET_CHARTACCOUNT_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_CHARTACCOUNT_SUCCESS: {
            return {
                ...state,
                loading: false,
                accounts: action.data.results,
                previous: action.data.previous,
                next: action.data.next,
                current_page: action.data.current_page,
                total_page: action.data.total_page,
                active: action.data.current_page,
            };
        }
        case type.GET_CHARTACCOUNT_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }
        case type.ADD_CHART_OF_ACCOUNT_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.ADD_CHART_OF_ACCOUNT_SUCCESS: {
            return {
                ...state,
                loading: false,
                accounts: [action.account,...state.accounts],
                success:'Chart Of Account Created Successfully'
                
            };
        }
        case type.ADD_CHART_OF_ACCOUNT_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case type.SET_CHART_OF_ACCOUNT_SUCCESS_ALERT: {
            return {
                ...state,
                success: action.payload,
            };
        }

        case type.SET_CHART_OF_ACCOUNT_ERROR_ALERT: {
            return {
                ...state,
                error: action.payload,
            };
        }
        
        

        default:
            return state;
    }
};

export default ChartAccount;
