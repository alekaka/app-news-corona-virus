import { wpApi } from "./config";

export default {
	getMap: () => {
		return wpApi.get('pages/13').then(result => { 
			return result.data; 
		});
	}
};