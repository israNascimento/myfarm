import React from 'react';
import {
  Platform,
  Alert,
  StatusBar,
  Dimensions,
  Image,
  ScrollView,
  Keyboard,
  Slider,
  FlatList,
  ListView
} from 'react-native';
import { List,ListItem,View,Input,Icon, Button, Text, Toast,Header,Left,Right,Body,Content,Container } from "native-base";
import { NavigationActions } from 'react-navigation';

const analytics = require('./instancias/analytics');
const {bancoLocal} = require('./instancias/conexao.js');

//==========| Fim dos Imports |==========//

export default class Talhao extends React.Component {
  constructor(props){
      super(props);
      this.state = { flag: false,talhoes:[] };
      this.atualiza();
  }
  componentWillMount(){ analytics.trackScreenView("Cadastro de Talhão"); }

  atualiza = () => {
      let tmp = {};
      bancoLocal.get('talhoes').then((doc) => {
          tmp = doc;
          this.setState({talhoes:tmp["talhoes"]});
      }).catch((erro) => {
          tmp = {
              "_id" : "talhoes",
              "talhoes": []
          }
          this.setState({talhoes:tmp["talhoes"]});
      })
  }

  render(){
    const { navigate } = this.props.navigation;
    return(
        <Container style={{paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight}}>
          <Header>
              <Left><Icon style={{color:Platform.OS === 'ios' ? "black" : "white"}} name="arrow-back" onPress={() => this.props.navigation.dispatch(NavigationActions.back())}/></Left>
              <Body><Text style={{color:Platform.OS === 'ios' ? "black" : "white",width:200}}>Cadastro de Talhão</Text></Body>
              <Right />
          </Header>

          <Content style={{backgroundColor:'#fff'}}>
              <FlatList
                  data={this.state.talhoes}
                  renderItem={({item}) => (
                      <ListItem style={{marginLeft:0}} onPress={() => {
                          navigate("CadTalhao",Object.assign(item,{anterior:this}));
                      }}>
                          <View style={{flexDirection:"row"}}>
                              <View style={{paddingVertical:8,paddingHorizontal:20,alignItems:'center',justifyContent:'center'}}>
                                  <Icon name="md-information-circle" style={{color:"#0288D1"}} onPress={() => {
                                      Alert.alert(JSON.stringify(item));
                                  }} />
                              </View>
                              <Text style={{flex:1,paddingVertical:8,marginLeft: 20}}>{item.n_parcela}</Text>
                              <View style={{paddingVertical:8,paddingHorizontal:15,alignItems:'center',justifyContent:'center'}}>
                                  <Icon name="md-trash" style={{color:"#C62828"}}/>
                              </View>
                          </View>
                      </ListItem>
                  )}
                  extraData={this.state.flag}
              />
          </Content>

          <Button rounded style={{position:'absolute',bottom:15,right:15}} onPress={() => navigate("CadTalhao",{anterior:this})}>
              <Icon name="md-add" />
          </Button>
      </Container>
    );
  }
};
