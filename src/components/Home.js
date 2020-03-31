import React, { useState, useEffect } from 'react';
import {
    View,
    FlatList
  } from 'react-native';
  import { APP_NAME, PRIMARY_COLOR, SECONDARY_COLOR, LIGHT_COLOR } from 'react-native-dotenv';
import { WebView } from 'react-native-webview';
import { Text, Card, ListItem, Button, Input } from 'react-native-elements';
import { Container, Tab, Tabs, TabHeading } from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import Loading from '../services/utils/loading';

import { Store } from '../services/utils/storage';

import { TextExtractor } from '../services/utils/textExtractor';

import Login from './Login';
import User from './User';

import ApiNews from '../services/api/news';
import ApiMap from '../services/api/map';
import ApiMedias from '../services/api/medias';

export default function Home({navigation}) {
  const [news, setNews] = useState([]);
  const [map, setMap] = useState([]);
  const [loading, setLoading] = useState(false);
  const [medias, setMedias] = useState([]);
  const [logged, setLogged] = useState(false);

  
  useEffect(() => { 
    const loadUser = async () => { 
      const user = await Store.get('user');
      if (user != null) {
        setLogged(true);
        return;
      }
      return;
    };

    loadMap();
    
    loadNews();

    loadUser();
  }, []);

  const loadNews = async () => {
    setLoading(true);

    try {
      const data = await ApiNews.getPosts();

      await Promise.all(data.map((data) => {
          return ApiMedias.getMedias(data.featured_media);
      })).then(result =>  setMedias(result));

      setNews(data);
      setLoading(false);
    } catch (error) {
      console.warn(error.response.data.code);
      switch(error.response.data.code) {
          case 'jwt_auth_invalid_token':
              await Store.delete('user');
              loadNews()
          break;
      }
      setLoading(false);
      return;
    }
  };

  const loadMap = async () => {
    setLoading(true);

    try {
      const data = await ApiMap.getMap();

      setMap(data.content.rendered);
      setLoading(false);
    } catch (error) {
      console.warn(error.response.data.code);
      switch(error.response.data.code) {
          case 'jwt_auth_invalid_token':
              await Store.delete('user');
              loadMap()
          break;
      }
    }
  };

  const renderItem = ({item, index}) => {
    item.excerpt.rendered = item.excerpt.rendered.replace(/(<([^>]+)>)/ig, '');

    const description = TextExtractor(item.excerpt.rendered, 0, 92);
    
    
    return (
      <Card
        title={item.title.rendered}
        image={{ uri: medias[index].data.guid.rendered }}>
        <Text style={{ marginBottom: 10 }}>
          {description+"..."}
        </Text>
        <Button
          icon={<Icon name='info' color={LIGHT_COLOR} style={{ fontSize: 18, margin: 8 }}/>}
          buttonStyle={{ backgroundColor: PRIMARY_COLOR, borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom:  0 }}
          title='VER NOTÍCIA' 
          onPress={() => { navigation.navigate('NewsFull', { setLogged: (logged) => { setLogged(logged); }, title: item.title.rendered, newsHtml: item.content.rendered, imgUrl: medias[index].data.guid.rendered }) }}
        />
      </Card>
    );
  }
  
  if (loading)
    return(
      <>
        <Loading/>
      </>
    );  
  return (
    <Container>
      <Tabs tabBarPosition='bottom' tabBarUnderlineStyle={{backgroundColor : 'white'}} locked={true}>
        <Tab heading={ <TabHeading style={{backgroundColor : SECONDARY_COLOR}}><Icon name='info' style={{ fontSize: 18, color: 'white', margin: 8 }} /><Text style={{ fontSize: 18, color: 'white' }}>Notícias</Text></TabHeading>}>
            <FlatList
              data={news}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()} 
              extraData={news} />
        </Tab>
        <Tab heading={ <TabHeading style={{backgroundColor : SECONDARY_COLOR}}><Icon name='map' style={{ fontSize: 18, color: 'white', margin: 8 }} /><Text style={{ fontSize: 18, color: 'white' }}>Map</Text></TabHeading>}>
          <View style={{ flex: 1 }}>
              <WebView
                style={{ flex: 1, backgroundColor: 'black' }}
                originWhitelist={['*']}
                scalesPageToFit={false}
                automaticallyAdjustContentInsets={true}
                source={{html: map}}
                javaScriptEnabled={true}
              />
          </View>
        </Tab>
        <Tab heading={ <TabHeading style={{backgroundColor : SECONDARY_COLOR}}><Icon name='user' style={{ fontSize: 18, color: 'white', margin: 8 }} /><Text style={{ fontSize: 18, color: 'white' }}>Conta</Text></TabHeading>}>
            { logged ?
              <User loggedExtenal={(logged) => {setLogged(logged)}} /> :
              <Login />
            }
        </Tab>
      </Tabs>
    </Container>
  );
}