import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Button, Input, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';


export default function PasswordVisible(props) {
  const navigation = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [iconName, setIconName] = useState('eye');

  const passwordVisible = () => {
    if (secureTextEntry) {
      setIconName('lock');
      setSecureTextEntry(false);
      props.secureTextEntry(false);
    } else {
      setIconName('eye');
      setSecureTextEntry(true);
      props.secureTextEntry(true);
    }
  }

  const test2 = () => {
    alert('ok')
  }

  return (
    <View> 
        {props.test} 
        <TouchableOpacity
          style={styles.button}
          onPress={() => passwordVisible()}
        >
          <Icon name={iconName} style={styles.icon}></Icon>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 3.7,
    right: 20,
    padding: 10
  },
  icon: {
    fontSize: 23
  }
});
