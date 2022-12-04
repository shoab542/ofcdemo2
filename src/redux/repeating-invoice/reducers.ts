import * as type from './types';

const INIT_STATE = {
    repeating_invoices: [],
    repeating_invoice_details: [],
    previous: '',
    next: '',
    current_page: '',
    total_page: '',
    active: '',
    loading: false,
    error: null,
};



const RepeatingInvoice = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case type.GET_REPEATINGINVOICE_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_REPEATINGINVOICE_SUCCESS: {
            return {
                ...state,
                loading: false,
                repeating_invoices: action.data.results,
                previous: action.data.previous,
                next: action.data.next,
                current_page: action.data.current_page,
                total_page: action.data.total_page,
                active: action.data.current_page,
            };
        }
        case type.GET_REPEATINGINVOICE_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }
        
        case type.GET_REPEATINGINVOICEDETAILS_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_REPEATINGINVOICEDETAILS_SUCCESS: {
            return {
                ...state,
                loading: false,
                repeating_invoice_details: action.data.result,
                previous: action.data.previous,
                next: action.data.next,
                current_page: action.data.current_page,
                total_page: action.data.total_page,
                active: action.data.current_page,
            };
        }
        case type.GET_REPEATINGINVOICEDETAILS_FAILED: {
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

export default RepeatingInvoice;
