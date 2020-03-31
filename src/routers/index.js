import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { APP_NAME, PRIMARY_COLOR, SECONDARY_COLOR, LIGHT_COLOR } from 'react-native-dotenv';
import { TextExtractor } from '../services/utils/textExtractor';
import Home from '../components/Home';
import News from '../components/News';
import NewsFull from '../components/NewsFull';
import User from '../components/User';
import Register from '../components/Register';
import EditUserProfile from '../components/EditUserProfile';
import Login from '../components/Login';

import axios from 'axios';

const Stack = createStackNavigator();

export default function Routers () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={ Home }
          options={({ route }) => ({  
              title: APP_NAME, 
              headerStyle: {
                backgroundColor: PRIMARY_COLOR,
              }, 
              headerTintColor: LIGHT_COLOR,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
          })}
        />
        <Stack.Screen
          name='User'
          component={ User }
          options={({ route }) => ({  
              title: 'User', 
              headerStyle: {
                backgroundColor: PRIMARY_COLOR,
              }, 
              headerTintColor: LIGHT_COLOR,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
          })}
        />
        <Stack.Screen
          name='Login'
          component={ Login }
          options={({ route }) => ({  
              title: 'Login', 
              headerStyle: {
                backgroundColor: PRIMARY_COLOR,
              }, 
              headerTintColor: LIGHT_COLOR,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
          })}
        />
        <Stack.Screen
          name='Register'
          component={ Register }
          options={({ route }) => ({  
              title: 'Registrar Usuário', 
              headerStyle: {
                backgroundColor: PRIMARY_COLOR,
              }, 
              headerTintColor: LIGHT_COLOR,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
          })}
        />
        <Stack.Screen
          name='EditUserProfile'
          component={ EditUserProfile }
          options={({ route }) => ({  
              title: 'Editar Perfil de Usuário', 
              headerStyle: {
                backgroundColor: PRIMARY_COLOR,
              }, 
              headerTintColor: LIGHT_COLOR,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
          })}
        />
        <Stack.Screen
          name='News'
          component={News}
        />
        <Stack.Screen
          name='NewsFull'
          component={ NewsFull }
          options={({ route }) => ({  
              title: TextExtractor(route.params.title, 0, 15)+'...', 
              headerStyle: {
                backgroundColor: PRIMARY_COLOR,
              }, 
              headerTintColor: LIGHT_COLOR,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};