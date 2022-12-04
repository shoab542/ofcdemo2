import axios from 'axios';

import config from '../../config';

// content type
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = config.API_URL;

// intercepting to capture errors

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        let message;

        if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const userInfo = JSON.parse(localStorage.getItem(AUTH_TOKEN_KEY) || '');
                        
            const refreshToken = userInfo.refresh
			if (refreshToken) {
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);
				console.log(tokenParts.exp);

				if (tokenParts.exp > now) {
					return axios
						.post('/api/token/refresh/', { refresh: refreshToken })
						.then((response) => {
							const newUpdateUserInfo = {
                                ...userInfo,
                                "access": response.data.access
                            }
                            localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(newUpdateUserInfo));
                            
							axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access;
                            window.location.href = '/';
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log('Refresh token is expired', tokenParts.exp, now);
                    localStorage.removeItem(AUTH_TOKEN_KEY)
					window.location.href = '/auth/login/';
				}
			} else {
				console.log('Refresh token not available.');
				window.location.href = '/auth/login/';
			}
		}
        else if (error && error.response && error.response.status === 404) {
            // window.location.href = '/not-found';
        } else if (error && error.response && error.response.status === 403) {
            window.location.href = '/access-denied';
        } else {
            switch (error.response.status) {
                case 401:
                    message = 'Invalid credentials';
                    break;
                case 403:
                    message = 'Access Forbidden';
                    break;
                case 404:
                    message = 'Sorry! the data you are looking for could not be found';
                    break;
                default: {
                    message =
                        error.response && error.response.data ? error.response.data['message'] : error.message || error;
                }
            }
            return Promise.reject(message);
        }
    }
);

const AUTH_TOKEN_KEY = 'ccl_user';


/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token: string | null) => {
    if (token) axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    else delete axios.defaults.headers.common['Authorization'];
};

const getUserFromCookie = () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    return token ? (typeof token == 'object' ? token : JSON.parse(token)) : null;
};
class APICore {
    /**
     * Fetches data from given url
     */
    get = (url: string, params: any) => {
        let response;
        if (params) {
            var queryString = params
                ? Object.keys(params)
                      .map((key) => key + '=' + params[key])
                      .join('&')
                : '';
            response = axios.get(`${url}?${queryString}`, params);
        } else {
            response = axios.get(`${url}`);
        }
        return response;
    };

    getFile = (url: string, params: any) => {
        let response;
        if (params) {
            var queryString = params
                ? Object.keys(params)
                      .map((key) => key + '=' + params[key])
                      .join('&')
                : '';
            response = axios.get(`${url}?${queryString}`, { responseType: 'blob' });
        } else {
            response = axios.get(`${url}`, { responseType: 'blob' });
        }
        return response;
    };

    getMultiple = (urls: string, params: any) => {
        const reqs = [];
        let queryString = '';
        if (params) {
            queryString = params
                ? Object.keys(params)
                      .map((key) => key + '=' + params[key])
                      .join('&')
                : '';
        }

        for (const url of urls) {
            reqs.push(axios.get(`${url}?${queryString}`));
        }
        return axios.all(reqs);
    };

    /**
     * post given data to url
     */
    create = (url: string, data: any) => {
        return axios.post(url, data);
    };

    /**
     * Updates patch data
     */
    updatePatch = (url: string, data: any) => {
        return axios.patch(url, data);
    };

    /**
     * Updates data
     */
    update = (url: string, data: any) => {
        return axios.put(url, data);
    };

    /**
     * Deletes data
     */
    delete = (url: string) => {
        return axios.delete(url);
    };

    /**
     * post given data to url with file
     */
    createWithFile = (url: string, data: any) => {
        const formData = new FormData();
        for (const k in data) {
            formData.append(k, data[k]);
        }

        const config = {
            headers: {
                ...axios.defaults.headers,
                'content-type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    };

    /**
     * post given data to url with file
     */
    updateWithFile = (url: string, data: any) => {
        const formData = new FormData();
        for (const k in data) {
            formData.append(k, data[k]);
        }

        const config = {
            headers: {
                ...axios.defaults.headers,
                'content-type': 'multipart/form-data',
            },
        };
        return axios.patch(url, formData, config);
    };

    isUserAuthenticated = () => {
        const token = this.getLoggedInUser();

        if (token) {
            return true;
        }else{
            return false
        }
       
    };

    setLoggedInUser = (user: any) => {
        if (user){
            localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(user));
        } 
        else {
            localStorage.removeItem(AUTH_TOKEN_KEY);
        }
    };
    /**
     * Returns the logged in user
     */
    getLoggedInUser = () => {
        return getUserFromCookie();
    };

    // setUserInSession = (modifiedUser: any) => {
    //     let userInfo = localStorage.getItem(AUTH_TOKEN_KEY);
    //     if (userInfo) {
    //         const { access, user } = JSON.parse(userInfo);
    //         this.setLoggedInUser({ access, ...user, ...modifiedUser });
    //     }
    // };
}

/*
Check if token available in session
*/
let user = getUserFromCookie();
if (user) {
    const { access } = user;
    if (access) {
        setAuthorization(access);
    }
}

export { APICore, setAuthorization };
