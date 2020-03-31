import { wpApi } from "./config";
import { Store } from '../utils/storage';
import ApiToken from './token';

wpApi.interceptors.request.use( async (config) => { 
    const user = await Store.get('user');


    if (user != null)
      config.headers.Authorization = `Bearer ${user.token}`;

    return config;
}, async (error) => {
    return Promise.reject(error);
});

wpApi.interceptors.response.use( async (response) => { 
    return response;
}, async (error) => {
    const originalRequest = error.config;
    const status = error.response.status;

    /*if (status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const user = await Store.get('user');
        if (user != null) {
            let data = {
                refresh_token: user.refresh_token
            };
            const result = await ApiToken.postRefreshToken(data);
            user.access_token = result.access_token;
            user.exp = result.exp;
            user.refresh_token = result.refresh_token;
            await Store.save('user', user);
        }
    }*/
    return Promise.reject(error);
});

export default wpApi;
