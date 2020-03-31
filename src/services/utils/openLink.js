import { Linking } from 'react-native';
import { Toast } from './toast';

export const openLink = (url) => {
    Toast.showWithGravity('Aguarde...', 300, Toast.CENTER);
    Linking.openURL(url).
        catch(err => 
            console.error('An error occurred', err));
};
