class Pessoa {
    nome: string;
    email: string;
    nasc: string;

    constructor(nome: string, email: string, nasc:string) {
        this.nome = nome;
        this.email = email;
        this.nasc = nasc;
    }

    imprimir():void{
        console.log("Nome: " + this.nome);
        console.log("Email: " + this.email);
        console.log("Data de Nascimento: " + this.nasc);
        console.log("Idade: " + this.idade(this.nasc));
        console.log("Anos Bissextos: " + this.numBissextos());
    }

    public idade(nasc:any):number{
        const hoje = new Date();
        const ano:number = parseInt(nasc.substring(6, 10));
        const mes:number = parseInt(nasc.substring(3, 5)) - 1;
        const dia:number = parseInt(nasc.substring(0, 2));

        const datan = new Date(ano, mes, dia);
        let idade:number = hoje.getFullYear() - datan.getFullYear();
        const m:number = hoje.getMonth() - datan.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < datan.getDate())) {
            idade--;
        }
        return idade;

    }

    public numBissextos(): number{
        const ano:number = parseInt(this.nasc.substring(6, 10));
        const hoje = new Date();
        const anoAtual:number = hoje.getFullYear();
        let quant:number = 0;
        for (let x=ano; x<= anoAtual; x++){
            if (DataUtil.isBissexto(x)){
                quant++;
            }
        }
        return quant;
    }

}


class DataUtil{
    ano:number;
    constructor(ano:number){
        this.ano = ano;
    }

    static isBissexto(ano:number):boolean{
        if (ano % 400 === 0) {
            return true;
        }else if (ano % 4 === 0 && ano % 100 !== 0) {
            return true;
        }else{
            return false;
        }
    }

}


const pessoa = new Pessoa("Carlos", "carlos123cadu12355@gmail.com", "10/09/2003");
pessoa.imprimir();