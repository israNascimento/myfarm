import React from 'react';
import { StatusBar,AsyncStorage,Platform,ActivityIndicator,View } from 'react-native';
import { Root } from 'native-base';
import { createStackNavigator,createSwitchNavigator } from 'react-navigation';

import Notificacoes from './instancias/notificacoes';

//=========| TELAS |=========//
import Principal from './principal';
import Sobre from './sobre';
import cadPropriedade from './cadPropriedade';
import cadPropriedadeNova from './cadPropriedadeNova';
import Perfil from './perfil';
import Talhao from './talhao';
import CadTalhao from './cadTalhao';
import CadAplicacao from './cadAplicacao';
import CadColheita from './cadColheita';
import Camera from './componentes/camera.js';
import Perdas from './perdas';
//===========================//

const analytics = require('./instancias/analytics');

const Deslogado = createStackNavigator({
    Inicio: Principal,
    Sobre: Sobre,
    "Cadastro de propriedade": cadPropriedade
},{headerMode: 'none'});

const Logado = createStackNavigator({
    Perfil: Perfil,
    Camera: Camera,
    Perdas: Perdas,
    Talhao: Talhao,
    CadTalhao: CadTalhao,
    CadAplicacao: CadAplicacao,
    CadColheita: CadColheita,
    "Cadastro de propriedade": cadPropriedade,
    "CadPropriedadeNova": cadPropriedadeNova
},{headerMode: 'none'});

class Carregando extends React.Component {
    constructor(props){
        super(props);
        this.verificaLogin();
    }

    verificaLogin = async () => {
        const logado = await AsyncStorage.getItem('logado');
        this.props.navigation.navigate(logado == 1 ? 'Logado' : 'Deslogado');
    }

    render(){
        return(
            <View style={{justifyContent:'center',textAlign:'center'}}>
                <ActivityIndicator size="large" color="#0f0" />
            </View>
        )
    }
}

const Navegador = createSwitchNavigator(
  {
      Carregando: Carregando,
      Deslogado: Deslogado,
      Logado: Logado
  },
  { initialRouteName: 'Carregando' }
);

export default class App extends React.Component {
    constructor(props){
        super(props);
    }

    componentWillMount() {
        analytics.setClient("35009a79-1a05-49d7-b876-2b884d0f825b");
    }

    render(){
        return(
          <Root>
              <StatusBar translucent backgroundColor="transparent" barStyle="light-content"/>
              <Notificacoes />
              <Navegador />
          </Root>
        );
    }
}
