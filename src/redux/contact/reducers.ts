import * as type from './types';

const INIT_STATE = {
    contact: [],
    invoice_list: [],
    invoice_list_pagination_data: {},
    invoice_setting: [],
    contact_details: [],
    all_contact: [],
    previous: '',
    next: '',
    current_page: '',
    total_object: '',
    total_page: '',
    active: '',
    loading: false,
    error: null,
    success:null,
    invoice_setting_error: null,
    invoice_setting_success:null,
};



const Contact = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case type.GET_CONTACT_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_CONTACT_SUCCESS: {
            return {
                ...state,
                loading: false,
                contact: action.data.results,
                previous: action.data.previous,
                next: action.data.next,
                current_page: action.data.current_page,
                total_object: action.data.total_object,
                total_page: action.data.total_page,
                active: action.data.current_page,
                
            };
        }
        case type.GET_CONTACT_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case type.GET_CONTACT_INVOICE_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_CONTACT_INVOICE_SUCCESS: {
            return {
                ...state,
                loading: false,
                invoice_list: action.data.results,
                invoice_list_pagination_data: {
                    previous: action.data.previous,
                    next: action.data.next,
                    current_page: action.data.current_page,
                    total_page: action.data.total_page,
                    active: action.data.current_page
                }
            };
        }
        case type.GET_CONTACT_INVOICE_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }


        case type.GET_CONTACT_INVOICE_SETTING_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_CONTACT_INVOICE_SETTING_SUCCESS: {
            return {
                ...state,
                loading: false,
                invoice_setting: action.data.results,
            };
        }
        case type.GET_CONTACT_INVOICE_SETTING_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }



        case type.UPDATE_CONTACT_INVOICE_SETTING_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.UPDATE_CONTACT_INVOICE_SETTING_SUCCESS: {
            return {
                ...state,
                loading: false,
                invoice_setting: action.data,
                invoice_setting_error: null,
                invoice_setting_success:"Contact Updated Successfully"
            };
        }
        case type.UPDATE_CONTACT_INVOICE_SETTING_FAILED: {
            return {
                ...state,
                loading: false,
                invoice_setting_error: action.error,
                invoice_setting_success: null,
            };
        }


        case type.GET_CONTACT_DETAILS_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_CONTACT_DETAILS_SUCCESS: {
            return {
                ...state,
                loading: false,
                contact_details: action.data,
            };
        }
        case type.GET_CONTACT_DETAILS_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case type.GET_ALLCONTACT_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_ALLCONTACT_SUCCESS: {
            return {
                ...state,
                loading: false,
                all_contact: action.data,
                previous: action.data.previous,
                next: action.data.next,
                current_page: action.data.current_page,
                total_page: action.data.total_page,
                active: action.data.current_page,
            };
        }
        case type.GET_ALLCONTACT_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case type.ADD_CONTACT_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.ADD_CONTACT_SUCCESS: {
            return {
                ...state,
                loading: false,
                contact: [action.contact,...state.contact],
                success:'Contact Created Successfully'
                
            };
        }
        case type.ADD_CONTACT_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case type.DELETE_CONTACT_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.DELETE_CONTACT_SUCCESS: {
            const newContact = state.contact.filter(({i}) => i !== action.id)
            return {
                ...state,
                loading: false,
                contact: newContact
                
            };
        }
        case type.DELETE_CONTACT_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }
       
           
        case type.SET_CONTACT_SUCCESS_ALERT: {
            
            return {
                ...state,
                success: action.payload,
            };
        }

        case type.SET_CONTACT_ERROR_ALERT: {
            
            return {
                ...state,
                error: action.payload,
            };
        }

        default:
            return state;
    }
};

export default Contact;
