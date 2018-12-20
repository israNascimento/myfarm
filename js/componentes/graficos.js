import React from 'react';
import {
  Platform,
  StatusBar,
  Dimensions,
  Image,
  ScrollView,
  Keyboard,
  Slider,
  FlatList,
  ListView
} from 'react-native';
import { Item,List,ListItem,View,Input,Icon, Button, Text, Toast,Header,Left,Right,Body,Content,Container } from "native-base";
import { NavigationActions } from 'react-navigation';
import { StackedAreaChart, YAxis, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

import axios from 'axios';
const parseString = require('react-native-xml2js').parseString;

const analytics = require('../instancias/analytics');
const {bancoLocal} = require('../instancias/conexao.js');

//==========| Fim dos Imports |==========//

export default class Graficos extends React.Component {
  constructor(props){
      super(props);
      this.state = {
         cotacao: ""
      }
  }

  componentWillMount(){
      axios.get("http://app.agrolink.com.br/ws.asmx/getCotacoes?codUsuario=231290&codEspecie=40&codCidade=0&sigla=RJ&PageNumber=1").then((r) => {
          var tmp = "";
          parseString(r.data.replace(/&lt;/g, "<").replace(/&gt;/g,">"),function(erro,xml){
              tmp = xml.string['NewDataSet'][0]['Table'][0];
          });
          this.setState({
              cotacao:{
                  valor: tmp["Valor"][0],
                  uf:tmp["UF"][0],
                  cidade:tmp["Cidade"][0],
                  data: tmp["Data"][0].split("T")[0]
              }
          });
      });
  }

  render(){

    const data = [
          {
              month: new Date(2015, 0, 1),
              gasto: 1000,
              lucro: 2120
          },
          {
              month: new Date(2015, 1, 1),
              gasto: 600,
              lucro: 2740
          },
          {
              month: new Date(2015, 2, 1),
              gasto: 2780,
              lucro: 720
          },
          {
              month: new Date(2015, 3, 1),
              gasto: 1600,
              lucro: 5140
          }
      ]

      const colors = [ '#4e8649','#9eb57b' ]
      const keys   = [  'lucro','gasto']

//contentInset={ { left: 10 } } #9eb57b
    return(
        <View style={{flex:1}}>
            <View style={{padding:15}}>
                <Text>Cotação do tomate : R$ {parseFloat(this.state.cotacao.valor).toFixed(2)} -  23kg</Text>
                <Text style={{fontSize:10,color:"#222"}}>Fonte : CEASA - {this.state.cotacao.cidade} - {this.state.cotacao.uf}. Em : {this.state.cotacao.data}</Text>
            </View>

            <View style={{justifyContent: 'flex-end',flex:1,flexDirection:'column'}}>
                <View style={{height:210,paddingRight:12,marginBottom:12}}>
                    <StackedAreaChart
                        style={ { height: 210 } }
                        data={ data }
                        keys={ keys }
                        colors={ colors }
                        curve={ shape.curveNatural }
                        showGrid={ true }
                        contentInset={{ top:6,left: 35 }}
                    ><Grid /></StackedAreaChart>
                    <YAxis
                        style={ { position: 'absolute', top: 0, bottom: 0,left: 5 }}
                        data={ StackedAreaChart.extractDataPoints(data, keys) }
                        contentInset={{ top: 6 }}
                        numberOfTicks={ 10 }
                        svg={{
                            fontSize: 10,
                            fill: 'black',
                            stroke: 'black',
                            strokeWidth: 0.4,
                            alignmentBaseline: 'baseline',
                            baselineShift: '2'
                        }}
                    />
                </View>
            </View>
        </View>
    );
  }
};
