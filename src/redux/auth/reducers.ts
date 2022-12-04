// apicore
import { APICore } from '../../helpers/api/apiCore';

// constants
import { AuthActionTypes } from './constants';

const api = new APICore();

const INIT_STATE = {
    user: api.getLoggedInUser(),
    loading: false,
};

interface UserData {
    id: number;
    email: string;
    phone: string;
    password: string;
    first_name: string;
    last_name: string;
    role: string;
    token: string;
}

interface AuthActionType {
    type:
        | AuthActionTypes.API_RESPONSE_SUCCESS
        | AuthActionTypes.API_RESPONSE_ERROR
        | AuthActionTypes.LOGIN_USER
        | AuthActionTypes.LOGOUT_USER
        | AuthActionTypes.RESET;
    payload: {
        actionType?: string;
        data?: UserData | {};
        key?: any;
        error?: string;
        success?: string;
    };
}

interface State {
    user?: UserData | {};
    loading?: boolean;
    value?: boolean;
}

const Auth = (state: State = INIT_STATE, action: AuthActionType): any => {
    switch (action.type) {
        case AuthActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case AuthActionTypes.LOGIN_USER: {
                    return {
                        ...state,
                        user: action.payload.data,
                        userLoggedIn: true,
                        loading: false,
                    };
                }
                case AuthActionTypes.SIGNUP_USER: {
                    return {
                        ...state,
                        loading: false,
                        userSignUp: true,
                    };
                }
                case AuthActionTypes.LOGOUT_USER: {
                    return {
                        ...state,
                        user: null,
                        loading: false,
                        userLogout: true,
                    };
                }
                
                case AuthActionTypes.UPDATE_PROFILE: {
                    return {
                        ...state,
                        user: api.getLoggedInUser(),
                        loading: false,
                        success: "Profile Updated Successfully"
                    };
                }
                case AuthActionTypes.UPDATE_PROFILE_IMAGE: {
                    return {
                        ...state,
                        user: api.getLoggedInUser(),
                        loading: false,
                    };
                }
                default:
                    return { ...state };
            }

        case AuthActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case AuthActionTypes.LOGIN_USER: {
                    return {
                        ...state,
                        error: action.payload.error,
                        userLoggedIn: false,
                        loading: false,
                    };
                }
                case AuthActionTypes.SIGNUP_USER: {
                    return {
                        ...state,
                        registerError: action.payload.error,
                        userSignUp: false,
                        loading: false,
                    };
                }
                
                case AuthActionTypes.UPDATE_PROFILE: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false,
                        
                    };
                }
                case AuthActionTypes.UPDATE_PROFILE_IMAGE: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false,
                        
                    };
                }
                default:
                    return { ...state };
            }

        case AuthActionTypes.LOGIN_USER:
            return { ...state, loading: true, userLoggedIn: false };
        case AuthActionTypes.LOGOUT_USER:
            return { ...state, loading: true, userLogout: false };
        case AuthActionTypes.RESET:
            return {
                ...state,
                loading: false,
                error: false,
                userSignUp: false,
                userLoggedIn: false,
                passwordReset: false,
                passwordChange: false,
                resetPasswordSuccess: null,
            };
        default:
            return { ...state };
    }
};

export default Auth;
