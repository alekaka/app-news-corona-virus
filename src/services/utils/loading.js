import React, { PureComponent } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { PRIMARY_COLOR } from 'react-native-dotenv';

export default class Loading extends PureComponent {
    render() {
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                margin: 20
            }}>
                <ActivityIndicator size="large" color={PRIMARY_COLOR} />
            </View>
        );
    }
}