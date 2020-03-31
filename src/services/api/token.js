import { wpApiToken } from "./config";

export default {
	getTokenValidate: (token) => {
        let config = { headers: { 
                                    'Authorization': 'Bearer '+token 
                                }
                    };
		return wpApiToken.get('token/validate', config).then(result => { 
			return result.data; 
		});
    },
    postRefreshToken: (data) => {
        return wpApiToken.post('token', data).then(result => { 
			return result.data; 
		});
    }
};