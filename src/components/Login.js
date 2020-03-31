import React, { useState, useEffect } from 'react';
import {
    View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Button, Input, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import User from './User';

import ApiAuth from '../services/api/auth';
import ApiUser from '../services/api/user';

import Loading from '../services/utils/loading';
import { Store } from '../services/utils/storage';

import PasswordVisible from './PasswordVisible';

export default function Login({route, loggedExtenal}) {
    const navigation = useNavigation();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(false);
    const [logged, setLogged] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    
    const submitLogin = async (pUsername = username, pPassword = password) => {
        if (!pUsername || !pPassword) {
            alert('Preenchar o nome de usuário e senha');
            return;
        }
        setLoading(true);
        let data = {
            username: pUsername,
            password: pPassword,
        };

        try {
            const result = await ApiAuth.postLogin(data);
            await Store.save('user', result);
            const user = await getOthersUserInfo(result);
            await Store.save('user', user);
            setUsername(null);
            setPassword(null);
            setLoading(false);
            setLogged(true);

            if (route.params.setLogged) {
                route.params.setLogged(true);
            }
                

            if (route.params.goBack)
                    navigation.goBack(null); 

            return;
        } catch (error) {
            switch(error.response.data.code) {
                
                case '[jwt_auth] invalid_username':
                    alert('Usuário não existe');
                break;
                case '[jwt_auth] invalid_email': 
                    alert('Email não existe');
                break;
                case '[jwt_auth] incorrect_password':
                    alert('Senha incorreta');
                break;
            }
            setLoading(false);
            return;
        }
    }

    const getOthersUserInfo = async (result) => { 
        setLoading(true);
        try {
            const user = await ApiUser.getUser(result.user_id);
            result.user_name = user.name ? user.name : null;
            result.user_description = user.description ? user.description : null;
            setLoading(false);
            return result;
        } catch (error) {
            alert('Ocorreu um erro ou entrar, tente novamente');
            console.log(error.response);
            setLoading(false);
        }
    }

  if (logged) 
    return (
        <>
            <User />
        </>
    );

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
                placeholder='Nome de Usuário / Email'
                onChangeText={(username) => setUsername(username)}
                disabled={loading}
            />
            <Input  
                placeholder='Senha'
                secureTextEntry={secureTextEntry}
                onChangeText={(password) => setPassword(password)}
                disabled={loading}
            />
            <PasswordVisible secureTextEntry={(status) => setSecureTextEntry(status)} />
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
                    title='  Entrar'
                    onPress={() => submitLogin()}
                    disabled={loading}
                />
            </View>
            <Text></Text>
            <Button
                title='Não Possui uma Conta? Cadastre-se'
                type='clear'
                onPress={() => navigation.navigate('Register', {submitLogin: (username, password) => submitLogin(username, password)})}
            />
        </View>
    </View>
  );
}