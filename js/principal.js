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
import {
  View,
  Form,
  Item,
  Input,
  Icon,
  Button,
  Text,
  Toast
} from 'native-base';

const analytics = require('./instancias/analytics');

function Texto(props) {
  return (
    <Item rounded style={styles.input}>
      <Icon name={props.icone} style={{ color: '#ffffff' }} />
      <Input
        style={{ color: '#ffffff' }}
        placeholder={props.placeholder}
        placeholderTextColor="#ffffff"
        {...props}
      />
    </Item>
  );
}

export default class Principal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { teclado: false };
  }

  //========| Listeners do teclado |=======//
  componentWillMount() {
    analytics.trackScreenView('Login');
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide
    );
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  _keyboardDidShow = () => {
    this.setState({ teclado: true });
  };
  _keyboardDidHide = () => {
    this.setState({ teclado: false });
  };
  //=======================================//

  render() {
    const { navigate } = this.props.navigation;

    let logo = null;
    if (!this.state.teclado) {
      logo = (
        <Image source={require('./assets/logo2.png')} style={styles.logo} />
      );
    }

    return (
      <ImageBackground
        source={require('./assets/1.jpg')}
        style={styles.imageContainer}
      >
        <Icon
          active
          name="ios-information-circle"
          style={{
            color: '#fff',
            fontSize: 26,
            position: 'absolute',
            zIndex: 999,
            right: 15,
            top: 35
          }}
          onPress={() => navigate('Sobre')}
        />
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={0}
          style={{ flex: 1 }}
        >
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            {logo}
          </View>

          <View style={{ paddingHorizontal: 30 }}>
            <Form>
              <Texto
                placeholder="Usuário"
                icone="person"
                keyboardType="email-address"
                returnKeyType="next"
              />
              <Texto
                placeholder="Senha"
                icone="key"
                secureTextEntry={true}
                returnKeyType="go"
              />
            </Form>
            <Button
              block
              style={{ borderRadius: 20, backgroundColor: '#004238' }}
              onPress={() => {
                Toast.show({
                  text: 'Login incorreto',
                  position: 'bottom',
                  buttonText: 'Ok'
                });
                AsyncStorage.setItem('logado', '1');
                this.props.navigation.navigate('Logado');
              }}
            >
              <Text>Login</Text>
            </Button>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: null,
              backgroundColor: 'transparent'
            }}
          >
            <Text
              style={styles.texto}
              onPress={() => {
                navigate('Cadastro de propriedade');
              }}
            >
              Cadastrar
            </Text>
            <Text
              style={[{ textAlign: 'right', flex: 1 }, styles.texto]}
              onPress={() => {
                fdc();
              }}
            >
              Esqueci a senha
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  logo: {
    alignSelf: 'center',
    position: 'absolute',
    width: 260,
    height: 96
  },
  texto: {
    color: '#fff',
    padding: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 7
  },
  input: {
    backgroundColor: 'rgba(0,0,0,.5)',
    borderColor: 'transparent',
    paddingHorizontal: 15,
    paddingVertical: 4,
    marginBottom: 20
  }
});
