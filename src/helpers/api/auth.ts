import { APICore } from './apiCore';

const api = new APICore();

// account
function login(params: { email: string; password: string }) {
    const baseUrl = '/api/auth/';
    return api.create(`${baseUrl}`, params);
}



function signup(params: { first_name: string;last_name: string; email: string; phone: string; password: string }) {
    const baseUrl = '/register/';
    return api.create(`${baseUrl}`, params);
}



function updateProfile(params: { first_name: string;last_name: string; email: string; phone: string }) {
    const baseUrl = '/api/update_profile';
    return api.updatePatch(`${baseUrl}`, params);
}

function updateProfileImage(params: { profile_image: File }) {
    const baseUrl = '/api/update_profile';
    return api.updateWithFile(`${baseUrl}`, params);
}

export { login, signup, updateProfile, updateProfileImage };
