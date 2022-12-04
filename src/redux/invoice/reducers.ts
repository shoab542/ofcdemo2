import * as type from './types';

const INIT_STATE = {
    invoices: [],
    invoice_details: [],
    previous: '',
    next: '',
    current_page: '',
    total_page: '',
    active: '',
    loading: false,
    error: null,
};



const Invoice = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case type.GET_INVOICE_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_INVOICE_SUCCESS: {
            return {
                ...state,
                loading: false,
                invoices: action.data.results,
                previous: action.data.previous,
                next: action.data.next,
                current_page: action.data.current_page,
                total_page: action.data.total_page,
                active: action.data.current_page,
            };
        }
        case type.GET_INVOICE_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }
        
        case type.GET_INVOICEDETAILS_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_INVOICEDETAILS_SUCCESS: {
            return {
                ...state,
                loading: false,
                invoice_details: action.data.result,
                previous: action.data.previous,
                next: action.data.next,
                current_page: action.data.current_page,
                total_page: action.data.total_page,
                active: action.data.current_page,
            };
        }
        case type.GET_INVOICEDETAILS_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        default:
            return state;
    }
};

export default Invoice;
