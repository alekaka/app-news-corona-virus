import React, { useState } from 'react';
import {
    View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Button, Input, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import ApiUser from '../services/api/user';

import Loading from '../services/utils/loading';

import PasswordVisible from './PasswordVisible';

export default function Register({route}) {
    const navigation = useNavigation();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const submit = async () => {
        if (!username || !password || !email) {
            alert('Preenchar o nome de usuário | senha | email');
            return;
        }
        setLoading(true);
        let data = {
            username: username,
            password: password,
            email: email,
        };

        try {
            const result = await ApiUser.postCreateUser(data);
            setLoading(false);
            route.params.submitLogin(username, password); 
            navigation.goBack(null); 
            return;
        } catch (error) {
            console.warn(error.response);
            switch(error.response.data.message) {
                
                case 'Username already exists, please enter another username':
                    alert('O nome de usuário já existe, digite outro nome de usuário');
                break;
                case "Email already exists, please try 'Reset Password'":
                    alert('O e-mail já existe, tente Redefinir senha');
                break;
            }
            setLoading(false);
            return;
        }
    }

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>  
        { loading ? <Loading/> : null }
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
            <Avatar
                rounded
                size="large"
                source={{
                    uri: 'https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png',
                }}
            />
        </View>
        <View>
            <Input  
                placeholder='Nome de Usuário'
                onChangeText={(username) => setUsername(username)}
                value={username}
                disabled={loading}
            />
            <Input
                placeholder='Senha'
                secureTextEntry={secureTextEntry}
                onChangeText={(password) => setPassword(password)}
                value={password}
                disabled={loading}
            />
            <PasswordVisible secureTextEntry={(status) => setSecureTextEntry(status)} />
            <Input
                placeholder='Email'
                onChangeText={(email) => setEmail(email)}
                value={email}
                disabled={loading}
            />
            <Text></Text>
            <View style={{ padding: 9 }}>
                <Button
                    icon={
                        <Icon
                            name='login'
                            size={15}
                            color="white"
                        />
                    }
                    title='  Registrar'
                    onPress={() => submit()}
                    disabled={loading}
                />
            </View>
        </View>
    </View>
  );
}