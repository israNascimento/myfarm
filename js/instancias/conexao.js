import PouchDB from 'pouchdb-react-native';

PouchDB.debug.enable('*');

const bancoLocal = new PouchDB('app');

const bancoRemoto = new PouchDB('http://localhost:5984/app');

bancoLocal.replicate.to('http://localhost:5984/app',{live:true,retry:true});
bancoLocal.replicate.from('http://localhost:5984/app',{live:true,retry:true});

function registraHistorico(categoria,conteudo){
    var historico = {};
    bancoLocal.get('historico', function(erro,doc){
        if(erro) {
            historico = {
                "_id" : "historico",
                "perdas": [],
                "aplicacoes": [],
                "colheitas": []
            }
        } else { historico = doc; }

        historico[categoria].push(conteudo);

        bancoLocal.put(historico, function(erro,doc){
            if(erro) return;
        });
    });
}

module.exports = {bancoLocal,bancoRemoto,registraHistorico};
