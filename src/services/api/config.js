import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

export const wpApi = axios.create({
    baseURL: API_URL,
    dataType: 'json',
    headers: {
     'Accept': 'application/json',
	 'Content-Type': 'application/json',
    }
});

export const wpApiToken = axios.create({
    baseURL: API_URL,
    dataType: 'json',
    headers: {
     'Accept': 'application/json',
	 'Content-Type': 'application/json',
    }
});
