class Cliente{
    constructor(dadosCliente){
        let dados           = JSON.parse(dadosCleinte);
        this._status        = dados.status;
        this._nome          = dados.nome
        this._dtNascimento  = new Date(dados.dtNascimento);
        this._telefone      = dados.telefone;
        this._whatsapp      = dados.whatsapp;
        this._obs           = dados.obs;
        this._restricao     = dados.restricao;
        this._idOperadora   = dados.idOperadora;
        this._telefone2     = dados.telefone2;
        this._whatsapp2     = dados.whatsapp2;
        this._idOperadora2  = dados.idOperadora2;
        this._endereco      = dados.endereco;
    }

    get status(){
        return this._status;
    }

    set status(status){
        this._status = status;
    }

    get nome(){
        return this._nome;
    }

    set nome(nome){
        this._nome = nome;
    }

    get dtNascimento(){
        return new Date(this._dtNascimento.getTime());
    }

    set dtNascimento(dtNascimento){
        this._dtNascimento = new Date(dtNascimento.getTime());
    }

    get telefone(){
        return this._telefone;
    }

    set telefone(telefone){
        this._telefone = telefone;
    }
    
    get whatsapp(){
        return this._whatsapp;
    }

    set whatsapp(whatsapp){
        this._whatsapp = whatsapp;
    }
    
    get obs(){
        return this._obs;
    }

    set obs(obs){
        this._obs = obs;
    }
    

    get restricao(){
        return this._restricao;
    }

    set restricao(restricao){
        this._restricao = restricao;
    }

    get idOperadora(){
        return this._idOperadora;
    }

    set idOperadora(idOperadora){
        this._idOperadora = idOperadora;
    }

    get telefone2(){
        return this._telefone2;
    }

    set telefone2(telefone2){
        this._telefone2 = telefone2;
    }

    get whatsapp2(){
        return this._whatsapp2;
    }

    set whatsapp2(whatsapp2){
        this._whatsapp2 = whatsapp2;
    }

    get idOperadora2(){
        return this._idOperadora2;
    }

    set idOperadora2(idOperadora2){
        this._idOperadora2 = idOperadora2;
    }

    get endereco(){
        return this._endereco;
    }

    set endereco(endereco){
        this._endereco = endereco;
    }
}