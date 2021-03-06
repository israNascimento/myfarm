import React from 'react';
import {
  Platform,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  AsyncStorage
} from 'react-native';
import { View,Form,Item,Input,Icon, Button, Text, Toast } from "native-base";

const analytics = require('./instancias/analytics');

function Texto(props){
    return(
        <Item rounded style={styles.input}>
            <Icon name={props.icone} style={{color:"#ffffff"}}/>
            <Input style={{color: "#ffffff"}} placeholder={props.placeholder} placeholderTextColor="#ffffff" {...props}/>
        </Item>
    );
}

export default class Sobre extends React.Component {
  constructor(props){
      super(props);
  }

  render(){
      const { navigate } = this.props.navigation;

      let logo = <Image source={require('./assets/logo2.png')} style={styles.logo} />

      return(
          <ImageBackground source={require('./assets/1.jpg')} style={styles.imageContainer}>
    		        <View style={{ flex:1,alignItems:'center',justifyContent:'center' }}>
                    {logo}
                </View>

                <View style={{paddingHorizontal: 30,marginBottom: 40}}>
                    <Text style={{textAlign: 'justify',color:'white'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nisi mauris, lobortis sed erat ac, semper iaculis orci. Sed ultrices, lectus vel venenatis pulvinar, dolor nisi pretium enim, at ultricies nunc mauris sit amet eros. Proin viverra lorem in ligula rutrum pellentesque sed malesuada dolor. Nam ante felis, vestibulum eu velit euismod, congue viverra urna. Donec ex lectus, euismod vitae viverra et, dictum ut lectus. Phasellus sed aliquet justo, quis imperdiet nisi.</Text>
                </View>
          </ImageBackground>
      );
    }
};

const styles = StyleSheet.create({
    imageContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    logo: {
        alignSelf: 'center',
        position: "absolute",
        width: 260,
        height: 96
    }
});
