class Endereco{
    construct(dadosEndereco){
        let dados = JSON.parse(dadosEndereco);
        this._idEndereco = dados.idEndereco;
        this._logradouro = dados.logradouro;
        this._cep = dados.cep
        this._complemento = dados.complemento;
        this._complementoRua = dados.complementoRua; // Complemento do cadastro de logradouros
        this._bairro = dados.bairro;
        this._cidade = dados.cidade;
        this._ufSigla = dados.ufSigla;
        this._tipoLograd = dados.tipoLograd;
        this._pontoReferencia = dados.pontoReferencia;
        this._latitude = dados.latitude;
        this._longitude = dados.longitude;
        this._taxaEntrega = dados.taxaEntrega;
        this._numEnd = dados.numEnd
    }
    
    set idEndereco(idEndereco){
        this._idEndereco = idEndereco;
    }

    get IdEndereco(){
        return this._idEndereco;
    }

    get Logradouro(){
        return this._logradouro;
    }

    set logradouro(logradouro){
        this._logradouro = logradouro;
    }

    get Cep(){
        return this._cep;
    }

    set Cep(cep){
        this._cep = cep;
    }

    get Complemento(){
        return this._complemento;
    }

    set Complemento(complemento){
        this._complemento = complemento;
    }

    get Bairro(){
        return this._bairro;
    }

    set Bairro(bairro){
        this._bairro = bairro;
    }

    get Cidade(){
        return this._cidade;
    }

    set Cidade(cidade){
        this._cidade = cidade;
    }

    get UfSigla(){
        return this._ufSigla;
    }

    set UfSigla(ufSigla){
        this._ufSigla = ufSigla;
    }

    get TipoLograd(){
        return this._tipoLograd;
    }

    set TipoLograd(tipoLograd){
        this._tipoLograd = tipoLograd;
    }

    get PontoReferencia(){
        return this._pontoReferencia;
    }

    set PontoReferencia(pontoReferencia){
        this._pontoReferencia = pontoReferencia;
    }

    get Latitude(){
        return this._latitude;
    }

    set Latitude(latitude){
        this._latitude = latitude;
    }

    get Longitude(){
        return this._longitude;
    }

    set Longitude(longitude){
        this._longitude = longitude;
    }

    get TaxaEntrega(){
        return this._taxaEntrega;
    }

    set TaxaEntrega(taxaEntrega){
        this._taxaEntrega = taxaEntrega;
    }

    get ComplementoRua(){
        return this._complementoRua;
    }

    set ComplementoRua(complementoRua){
        this._complementoRua = complementoRua;
    }
}