import React from 'react';
import {
  Platform,
  Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  AsyncStorage,
  FlatList,
  TouchableHighlight
} from 'react-native';
import { View,Input,Icon, Button, Text, Card, Toast,Header,Content,Container } from "native-base";
import Share from 'react-native-share';

var ScrollableTabView = require('react-native-scrollable-tab-view');

import FacebookTabBar from './componentes/FacebookTabBar';
import {imagemClima} from './componentes/previsaoTempo';

import Galeria from './componentes/galeria';
import Graficos from './componentes/graficos';
import Historico from './componentes/historico';

const analytics = require('./instancias/analytics');
const {bancoLocal} = require('./instancias/conexao.js');

function Opcao(props){
  return(
      <Card {...props} style={{width:Dimensions.get('window').width/3,height:Dimensions.get('window').width/3,alignItems:'center',justifyContent:'center'}}>
          <Icon name={props.icone} style={{marginBottom:10}}/>
          <Text>{props.texto}</Text>
      </Card>
  );
}

const compartilhamento = {
  title: "MyFarm",
  message: "aaaaaaaaaaa",
  url: "http://google.com",
  subject: "sssssssssss" //  for email
};

export default class Perfil extends React.Component {
  constructor(props){
      super(props);

      this.state = {tempo:{icone:null,descricao:"",temperatura:null},nome_propriedade:"Carregando..",propriedades: 0,propriedade_atual:0};

      fetch('https://api.openweathermap.org/data/2.5/weather?q=Seropedica,br&appid=fbcb1d716b39d13ab10b83ec65f5c773&lang=pt')
      .then((res) => res.json())
      .then((resJson) => {
          let tmp = resJson.weather[0].description;
          this.setState({tempo:{
              descricao: tmp[0].toUpperCase() + tmp.slice(1),
              temperatura: (resJson.main.temp - 273).toFixed(2) + " º",
              icone: imagemClima(resJson.weather[0].icon,100,100)
          }});
       })
       .catch((erro) => Alert.alert(erro.message));
  }

  componentWillMount(){
      analytics.trackScreenView("Menu da propriedade");
      bancoLocal.get('dados').then((doc) => {
          this.setState({nome_propriedade: doc["propriedades"][0]["nome_propriedade"],propriedades: doc["propriedades"].length});
      });
  }

  desloga = async () => {
      Toast.show({
          text: 'Deslogado',
          position: 'bottom',
          buttonText: 'Ok'
      });
      await AsyncStorage.clear();
      this.props.navigation.navigate('Deslogado');
  };

  render = () => {
    const { navigate } = this.props.navigation;

    var tmp = null;
    if(this.state.tempo.descricao == ""){
        tmp = <View style={{justifyContent:'center',alignItems:'center',height: 112,marginTop:30}}>
                  <Text style={{color: '#fff',fontSize:20}}>Carregando...</Text>
              </View>
    } else {
        tmp = <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height: 80,marginTop:30,marginBottom:25}}>
                  {this.state.tempo.icone}
                  <Text style={{color:'#fff',fontSize:40,marginLeft:15}}>{this.state.tempo.temperatura}</Text>
              </View>
    }

    let exibeOutrasPropriedades = (this.state.propriedades == 0) ? {opacity:0} : {opacity:1}

    return(
        <Container style={{backgroundColor:'#eee'}}>
            <ImageBackground blurRadius={15} source={require('./assets/1.jpg')} style={{width:Dimensions.get('window').width,height:300,backgroundColor:'transparent'}}>
                <View style={{height:250,width:Dimensions.get('window').width,alignItems:'center',justifyContent:'center'}}>

                    <Icon active name="md-power" style={{color:"#fff",fontSize:22,position:"absolute",left: 15,top:35}} onPress={() => this.desloga()}/>
                    {tmp}
                    <Icon active name="md-share" style={{color:"#fff",fontSize:22,position:"absolute",right: 15,top:35}} onPress={() => Share.open(compartilhamento)}/>

                    <Icon active name="ios-arrow-back" style={Object.assign(exibeOutrasPropriedades,{color: 'white',position:"absolute",left: 15,top:170})} />
                    <Text style={{color:'#fff', fontSize:22}}>{this.state.nome_propriedade}</Text>
                    <Icon active name="ios-arrow-forward" style={Object.assign(exibeOutrasPropriedades,{color: 'white',position:"absolute",right: 15,top:170})} />

                    <Text style={{color:'#dfd', marginBottom: 5}}>{this.state.tempo.descricao}</Text>

                </View>
            </ImageBackground>

            <ScrollableTabView renderTabBar={() => <FacebookTabBar />} tabBarTextStyle={{color:'#fff',backgroundColor:'transparent'}} initialPage={2} style={{marginTop:-50}}>

              {/*       PERFIL       */}
              <View tabLabel="md-person" style={{padding:10,flex:1,marginTop:10}}>
                  <Text style={{fontSize:18,marginLeft:5}}>PAINEL DO USUÁRIO</Text>
                  <Text style={{fontSize:14,color:'#444', marginBottom:8,marginLeft:5}}>Gerenciamento do cadastro</Text>

                  <Card style={{flex:1,padding:20,marginBottom:15,flexDirection: 'column',justifyContent: 'space-between'}}>
                      <Button block light onPress={() => navigate("Cadastro de propriedade",{logado: true})}>
                          <Text>Mudar dados</Text>
                      </Button>
                      <Button block  onPress={() => {
                          // erro();
                          navigate("CadPropriedadeNova");
                      }}  light>
                          <Text>Cadastrar nova propriedade</Text>
                      </Button>
                      <Button block danger onPress={() => this.desloga()}>
                          <Text>Deslogar</Text>
                      </Button>
                  </Card>
              </View>

              {/*        GALERIA        */}
              <View tabLabel="md-photos" style={styles.galeria}>
                  <Galeria navegacao={navigate}/>
              </View>

              {/*       PROPRIEDADE       */}
              <ScrollView tabLabel="md-home" style={{padding:10,flex:1,marginTop:10}}>
                  <Text style={{fontSize:18,marginLeft:5}}>CADASTRO</Text>
                  <Text style={{fontSize:14,color:'#444', marginBottom:8,marginLeft:5}}>Cadastro das atividades do campo</Text>

                  <Card style={{flex:1,padding:10,marginBottom:30}}>
                      <Button block light style={{marginBottom:15}} onPress={() => navigate("Talhao")}>
                          <Text>Talhão</Text>
                      </Button>
                      <Button block light style={{marginBottom:15}}
                        onPress={() => navigate('Perdas')}>
                          <Text>Perdas</Text>
                      </Button>
                      <Button block light style={{marginBottom:15}}
                        onPress={() => navigate('CadAplicacao')}>
                          <Text>Aplicações</Text>
                      </Button>
                      <Button block light style={{marginBottom:15}}
                        onPress={() => navigate('CadColheita')}>
                          <Text>Colheita</Text>
                      </Button>
                  </Card>
              </ScrollView>

              {/*       GRÁFICO       */}
              <View tabLabel="md-pie" style={{padding:10,flex:1,marginTop:10}}>
                  <Text style={{fontSize:18,marginLeft:5,marginBottom:10}}>ESTATÍSTICAS</Text>

                  <Card style={{position: 'absolute',top: 5,right: 10,width: 140,height: 25,padding: 5}}>
                      <View style={{flex:1,flexDirection: 'row',justifyContent:'center'}}>
                          <View style={{backgroundColor:"#9eb57b",height: 15,width: 15,marginRight: 5}}/><Text style={{fontSize:12,marginRight: 10}}>Ganho</Text>
                          <View style={{backgroundColor:"#4e8649",height: 15,width: 15,marginRight: 5}}/><Text style={{fontSize:12}}>Lucro</Text>
                      </View>
                  </Card>

                  <Card style={{flex:1,marginBottom:5}}>

                  </Card>
              </View>

              {/*       HISTÓRICO       */}
              <View tabLabel="md-paper" style={{flex:1,paddingTop:20}}>
                  <Historico />
              </View>
            </ScrollableTabView>
        </Container>
    );
  }
};

const styles = StyleSheet.create({
    galeria:{
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 5
    }
});
