import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import { Container, Content, Card, CardItem, Text, Right } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { Store } from '../services/utils/storage';

import Loading from '../services/utils/loading';

import Login from './Login';

import ApiUser from '../services/api/user';

import forceUpdate from '../services/utils/forceUpdate';

export default function User({route, loggedExtenal}) {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const timerToClear = useRef(false);

    useEffect(() => { 
        const loadUser = async () => {
            try {
                timerToClear.current = setTimeout(()=>{ setLoading(false); }, 800); 
                const result = await Store.get('user');

                if (result != null)
                    setUser(result);
                return;
            } catch (error) {
                timerToClear.current  = setTimeout(()=>{ setLoading(false); }, 800); 
                console.warn(error);
                setUser(null);
                return;
            }
            
            return;
        };

        loadUser();

        return () => {
            clearInterval(timerToClear.current);
        }
    }, []);

    const logout = async () => { 
        setUser(null);
        await Store.delete('user');
    }

    if (loading)
        return(
            <>
                <Loading/>
            </>
        );  

    if (!user)
        return (
            <>
                <Login />
            </>
        );

    return (
        <View style={{flex: 1, flexDirection: 'column'}}>  
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
                <Avatar
                    rounded
                    size="large"
                    source={{
                        uri: 'https://png.pngtree.com/svg/20161027/service_default_avatar_182956.png',
                    }}
                />
                <Text>{user.user_name}</Text>
                <Text></Text>
            </View>
            <View style={{ padding: 9 }}>
                <Card>
                    <TouchableOpacity onPress={() => navigation.navigate('EditUserProfile', {user: user, setUser: (user) => setUser(user)})}>
                        <CardItem>
                            <Icon active name='user' size={15} />
                            <Text>    Meu Perfil        </Text>
                            <Right>
                                <Icon name='arrow-right' size={15} />
                            </Right>
                        </CardItem>
                    </TouchableOpacity>
                </Card>
                <Card>
                    <TouchableOpacity onPress={() => {logout(); loggedExtenal(false);}}>
                        <CardItem>
                            <Icon name='logout' size={15} />
                            <Text>    Sair                    </Text>
                            <Right>
                                <Icon name='arrow-right' size={15} />
                            </Right>
                        </CardItem>
                    </TouchableOpacity>

                </Card>
            </View>
        </View>
    );
}