import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Image,
    Text,
    ScrollView
  } from 'react-native';
import { Button } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import Loading from '../services/utils/loading';

import { Store } from '../services/utils/storage';


function NewsFull({route, navigation}) {
  const refWebview = useRef(null);
  const [loading, setLoading] = useState(true);
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(null);

  const styleHtml = '<style>* { margin: 0; } body { width: 100%; } img { width: 100%; height: 50%; } </style>';
  const header = '<meta name="viewport" content="initial-scale=0.99, maximum-scale=0.99, user-scalable=0"><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">';
  
  useEffect(() => {
    setLoading(true);
    route.params.setLogged(logged);
    const loadUser = async () => { 
      const user = await Store.get('user');
      if (user != null) {
        setUser(user);
        setLogged(true);
        setLoading(false);
        return;
      }
      setLoading(false);
      return;
    };
    loadUser();
    return;
  }, [logged]);

  return (
    <View style={{ flex: 1 }}>
        <Image
          style={{ width: '100%', height: 40 }}
          source={{ uri: route.params.imgUrl }}
        />
        <Text style={{ fontSize: 12, textAlign: 'center', padding: 8 }}>{route.params.title}</Text>
        <WebView
          ref={refWebview}
          originWhitelist={['*']}
          scalesPageToFit={false}
          scrollEnabled={false}
          automaticallyAdjustContentInsets={true}
          source={{html: header+styleHtml+'<body><div class="container">'+route.params.newsHtml+'</div></body>'}}
          javaScriptEnabled={true}
        />
        { loading ? <Loading/> : 
          logged && user ?
            <Text>Olá, {user.user_name}</Text>
          : 
            <Button
                title='Login'
                type='clear'
                onPress={() => navigation.navigate('Login', {goBack: true, setLogged: (logged) => { setLogged(logged) }})}
            />
        }
    </View>
  );
}

export default NewsFull;
