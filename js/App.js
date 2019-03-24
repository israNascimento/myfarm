import React from 'react';
import { AsyncStorage, View, ActivityIndicator } from 'react-native';
const analytics = require('./instancias/analytics');
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';

class Carregando extends React.Component {
  constructor(props) {
    super(props);
    this.verificaLogin();
  }

  verificaLogin = async () => {
    const logado = await AsyncStorage.getItem('logado');
    //this.props.navigation.navigate(logado == 1 ? 'Logado' : 'Deslogado');
    console.log(logado);
  };

  render() {
    return (
      <View style={{ justifyContent: 'center', textAlign: 'center' }}>
        <ActivityIndicator size="large" color="#0f0" />
      </View>
    );
  }
}

const Navegador = createSwitchNavigator(
  {
    Carregando: Carregando
  },
  { initialRouteName: 'Carregando' }
);

const Container = createAppContainer(Navegador);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    analytics.setClient('35009a79-1a05-49d7-b876-2b884d0f825b');
  }

  render() {
    return (
      <View>
        <Container />
      </View>
    );
  }
}
