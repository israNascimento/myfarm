import React from 'react';
import { StatusBar, AsyncStorage, View, ActivityIndicator } from 'react-native';
const analytics = require('./instancias/analytics');
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';
import { Root } from 'native-base';
import Notificacoes from './instancias/notificacoes';

//=========| TELAS |=========//
import Principal from './principal';
import Sobre from './sobre';
import cadPropriedade from './cadPropriedade';

const Deslogado = createStackNavigator(
  {
    Inicio: Principal,
    Sobre: Sobre,
    'Cadastro de propriedade': cadPropriedade
  },
  { headerMode: 'none' }
);

class Carregando extends React.Component {
  constructor(props) {
    super(props);
    this.verificaLogin();
  }

  verificaLogin = async () => {
    const logado = await AsyncStorage.getItem('logado');
    this.props.navigation.navigate(logado == 1 ? 'Logado' : 'Deslogado');
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
    Carregando: Carregando,
    Deslogado: Deslogado
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
      <Root>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <Notificacoes />
        <Container />
      </Root>
    );
  }
}
