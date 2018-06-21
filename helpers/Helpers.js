class Helpers{

    static dateFormatBr(data){
        return data.toLocaleDateString('pt-br');
    }

    static horaFormat(data){
        return data.toLocaleTimeString('pt-br');
    }

    static dataHoraFormatBr(data){
        return this.dateFormatBr(data) +" "+ this.horaFormat(data);
    }

}