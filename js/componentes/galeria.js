import React from 'react';
import {
  Platform,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  Keyboard,
  Alert,
  AsyncStorage,
  FlatList,
} from 'react-native';
import { Card,View,Icon, Button, Text, Toast,Fab,Badge } from "native-base";
import Lightbox from 'react-native-lightbox';

const {bancoLocal,bancoRemoto} = require('../instancias/conexao.js');

var contador = 0;

var galeria = {};

export default class Galeria extends React.Component {
    constructor(props){
        super(props);

        let tmp = [
            {id: "1",local: "http://portal.ufrrj.br/wp-content/uploads/2015/08/Foto-12-Veiculos-novos-para-UFRRJ-1150x300_c.jpg"},
            {id: "2",local: "https://www.brasil247.com/images/cache/1000x357/crop/images%7Ccms-image-000341599.jpg"},
            {id: "3",local: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3fd4VEsbvlV9zID-0KJBialiic49l41ojh7_QtEiFsYYIVyB6"},
            {id: "4",local: "http://3.bp.blogspot.com/_qS8YczRuwno/TQPpYLklT3I/AAAAAAAAABc/_qTttWOuShU/s1600/Arquitetura_UFRRJ.jpg"},
            {id: "5",local: "https://3.kekantoimg.com/_KCltK0xNROak71P6zCLwYeHGO4=/520x205/s3.amazonaws.com/kekanto_pics/pics/63/648063.jpg"},
            {id: "6",local: "http://r1.ufrrj.br/petsi/sudestepetrj2014/wp-content/uploads/2012/08/60872_113846268781206_333392715_n-e1389547390547.jpg"},
            {id: "7",local: "https://i0.wp.com/www.seropedicaonline.com/wp-content/uploads/2015/03/P4.jpg"}
        ];

        this.state = {
            fabAtivo: false,
            apagar: false,
            fotos: tmp
        }
    }

    componentWillMount = () => {
        bancoLocal.get('galeria').then((doc) => {
            galeria = doc;
            this.setState({fotos: galeria.fotos});
            // console.warn(doc);
        }).catch((erro) => {
            // console.warn(erro);
            galeria = {
                "_id" : "galeria"
            }
        });
    }

    renderizaFotos = () => {
        var tmp = (Dimensions.get('window').width - 40)/3;
        return this.state.fotos.map(foto =>
            <Lightbox style={{margin: 5,backgroundColor:"#aaa"}} key={++contador} renderContent={()=>{return(
                <View style={{flex:1}}>
                  <StatusBar translucent backgroundColor="#000" barStyle="light-content"/>
                  <Image style={{flex:1}} resizeMode="contain" source={{ uri: foto.local.toString()}} />
                </View>
            )}}>
                <View>
                    {this.state.apagar == true &&
                        <Button rounded danger style={{position: 'absolute',right:2,top:2,height:40,width:46,padding: 2,zIndex:999}} onPress={() =>{
                            Alert.alert(
                                'Confirmar exclusão',
                                'Deseja realmente apagar esta foto?',
                                [
                                  {text: 'Não', onPress: () => {}, style: 'cancel'},
                                  {text: 'Sim', onPress: async () => {
                                      var tmp = this.state.fotos;
                                      for(var i=0;i<tmp.length;i++){
                                          if(tmp[i] == foto) tmp.splice(i,1);
                                      }
                                      this.setState({fotos: tmp});
                                      galeria.fotos = tmp;
                                      bancoLocal.put(galeria, function(erro,doc){
                                          if(erro) return;
                                          galeria._rev = doc._rev;
                                      });
                                  }}
                                ],
                                { cancelable: false }
                            );

                        }}><Icon name="md-trash" style={{fontSize:14}}/></Button>
                    }
                    <Image style={{height:tmp*0.7,width:tmp}} source={{ uri: foto.local.toString()}} />
                </View>
            </Lightbox>
        );
    }

    render(){
      const navigate  = this.props.navegacao;
      return(
        <View style={{flex:1}}>
            <ScrollView style={{flex:1}}>
                <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                    { this.renderizaFotos() }
                </View>
            </ScrollView>
            <Fab
                active={this.state.fabAtivo}
                direction="up"
                containerStyle={{ }}
                style={{ backgroundColor: '#3F51B5' }}
                position="bottomRight"
                onPress={() => this.setState({ fabAtivo: !this.state.fabAtivo })}>

                <Icon name="md-camera" />

                <Button style={{ backgroundColor: '#E53935' }} onPress={() => this.setState({apagar:!this.state.apagar}) }>
                    <Icon name="md-trash" />
                </Button>
                <Button style={{ backgroundColor: '#2E7D32' }} onPress={() => navigate("Camera")}>
                    <Icon name="md-aperture" />
                </Button>
            </Fab>
        </View>
    )}
}
