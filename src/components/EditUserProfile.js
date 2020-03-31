import React, { useState } from 'react';
import { Text, Button, Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import User from './User';

import ApiUser from '../services/api/user';

import Loading from '../services/utils/loading';
import { Store } from '../services/utils/storage';

export default function EditUserProfile({route}) {
    const navigation = useNavigation();
    const { user, setUser } = route.params;
    const [name, setName] = useState(user.user_name);
    const [description, setDescription] = useState(user.user_description);
    const [loading, setLoading] = useState(false);
    
    const submit = async () => {
        if (!name) {
            alert('Preenchar seu nome');
            return;
        }
        setLoading(true);

        let data = {
            name: name,
            description: description
        };

        try {
            const userId = user.user_id;
            const result = await ApiUser.postUpdateUser(userId, data);
            console.warn(result)
            user.user_name = result.name;
            user.user_description = result.description;
            setUser(null);
            setUser(user);
            setDescription(null);
            setDescription(description);
            Store.save('user', user);
            setLoading(false);
            return;
        } catch (error) {
            console.warn(error.response.data.code);
            switch(error.response.data.code) {
                case 'jwt_auth_invalid_token':
                    alert('Sua sessão expirou, login novamente para continuar.');
                    await Store.delete('user');
                    setUser(null);
                    navigation.navigate('Home');
                break;
            }
            setLoading(false);
            return;
        }
    }

    return (
        <>
            { loading ? <Loading/> : null }

            <Input  
                placeholder='Email'
                value={user.user_email}
                disabled={true}
            />

            <Input  
                placeholder='Nome'
                onChangeText={(name) => setName(name)}
                value={name}
                disabled={loading}
            />

            <Input  
                placeholder='Sobre'
                onChangeText={(description) => setDescription(description)}
                value={description ? description : null}
                disabled={loading}
            />

            <Text></Text>

            <Button
                title='Atualizar'
                onPress={() => submit()}
                disabled={loading}
            />
        </>
    );
}