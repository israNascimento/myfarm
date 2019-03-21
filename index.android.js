import React, { Component } from 'react';
import { View, Text } from 'react-native';
const { AppRegistry } = require('react-native');

class App extends Component {
    render(){
        return(
            <View>
                <Text>Ola mundo!</Text>
            </View>
        );
    }
}

AppRegistry.registerComponent('MyFarm', () => App);
