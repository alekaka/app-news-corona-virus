import { wpApi } from "./config";

export default {
	getMedias: (id) => {
		return wpApi.get('media/'+id).then(result => { 
			return result; 
		});
	}
};