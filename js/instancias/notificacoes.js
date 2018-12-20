import Read, {Component} from 'react';
import Alert from 'react-native';
import PushNotification from 'react-native-push-notification';

var {bancoLocal,bancoRemoto} = require('./conexao.js');

export default class Notificacoes extends Component{
    constructor(props){
        super(props);
        PushNotification.configure({
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },

            onNotification: function(notificacao){
                console.error(notificacao);
                notificacao.finish(PushNotificationIOS.FetchResult.NoData);
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,
        });

        setInterval(() => {
            bancoLocal.get('mensagens', function(erro,doc){
                if(!erro) {
                    PushNotification.localNotification({
                        id: 12,
                        title: "MyFarm",
                        message: doc.msg,
                        vibrate: true, // (optional) default: true
                        vibration: 300,
                        userInteraction: true
                    })
                    // bancoLocal.remove(doc);
                }
            });
        },2000);
    }

    render(){return null}
}
