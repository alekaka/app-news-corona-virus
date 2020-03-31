import { wpApi } from "./config";

export default {
	getPosts: () => {
		return wpApi.get('posts').then(result => { 
			return result.data; 
		});
	}
};