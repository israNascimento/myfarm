import React from 'react';
import {
  Platform,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  Keyboard,
  Alert,
  AsyncStorage,
  FlatList
} from 'react-native';
import { Container,View,Icon, Button, Text, Toast,Fab,Footer, FooterTab } from "native-base";

import Timeline from 'react-native-timeline-listview'
const {bancoLocal} = require('../instancias/conexao.js');

const icones = {
    "teste" : require("../img/sunny.png")
};

var historico = {}
bancoLocal.get('historico', function(erro,doc){
    if(erro) {
        historico = {
            "_id" : "historico",
            "perdas": [],
            "aplicacoes": [],
            "colheitas": []
        }
    } else { historico = doc; }
});

export default class Historico extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            aba: "aplicacoes",
            btn: [{color:"#020"},{color:"#fff"},{color:"#020"}]
        }
    }

    componentWillMount() {

    }

    render(){
        return(
            <Container>
                <View style={{flex:1,paddingHorizontal:10}}>
                    {1 == 2 ?
                        <Timeline innerCircle={'icon'} data={historico[this.state.aba]} circleColor='rgb(46,131,60)' lineColor='rgb(96,173,75)' />
                    : (
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontSize: 28,color: "#555"}}>Nenhum registro</Text>
                        </View>
                    )}
                </View>

                <Footer>
                    <FooterTab style={{backgroundColor:"#4e8649"}}>
                        <Button onPress={() => {this.setState({aba:"perdas",btn: [{color:"#fff"},{color:"#020"},{color:"#020"}]})}}>
                            <Text style={this.state.btn[0]}>Perdas</Text>
                        </Button>
                        <Button onPress={() => {this.setState({aba:"aplicacoes",btn: [{color:"#020"},{color:"#fff"},{color:"#020"}]})}}>
                            <Text style={this.state.btn[1]}>Aplicações</Text>
                        </Button>
                        <Button onPress={() => {this.setState({aba:"colheitas",btn: [{color:"#020"},{color:"#020"},{color:"#fff"}]})}}>
                            <Text style={this.state.btn[2]}>Colheitas</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>

        )
    }
}
