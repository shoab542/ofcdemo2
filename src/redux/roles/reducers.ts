import * as type from './types';

const INIT_STATE = {
    roles: [],
    previous: '',
    next: '',
    current_page: '',
    total_page: '',
    active: '',
    user_role: [],
    loading: false,
    error: null,
};



const Role = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case type.GET_ROLE_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_ROLE_SUCCESS: {
            return {
                ...state,
                loading: false,
                roles: action.data.results,
                previous: action.data.previous,
                next: action.data.next,
                current_page: action.data.current_page,
                total_page: action.data.total_page,
                active: action.data.current_page,
            };
        }
        case type.GET_ROLE_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case type.GET_USERROLE_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_USERROLE_SUCCESS: {
            return {
                ...state,
                loading: false,
                user_role: action.user_role,
            };
        }
        case type.GET_USERROLE_FAILED: {
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

export default Role;
