import wpApi from "./interceptors";

export default {
	postCreateUser: (data) => {
		return wpApi.post('users/register', data).then(result => { 
			return result.data; 	
		});
	},
	getUser: (id) => {
		return wpApi.get('users/'+id).then(result => { 
			return result.data; 	
		});
	},
	postUpdateUser: (id, data) => {
		return wpApi.post('users/'+id, data).then(result => { 
			return result.data; 	
		});
	}
};