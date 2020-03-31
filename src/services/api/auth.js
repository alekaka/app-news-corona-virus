import wpApi from "./interceptors";
import { API_AUTH_URL } from 'react-native-dotenv';

export default {
	postLogin: (data) => {
		return wpApi.post(API_AUTH_URL, data).then(result => { 
			return result.data; 	
		});
	}
};