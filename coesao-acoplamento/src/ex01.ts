class ContaBancaria {
  saldo: number;
  constructor(saldo: number) {
    this.saldo = saldo;
  }

  depositar(valor: number): number | string {
    if (valor > 0) {
      this.saldo = this.saldo + valor;
      return this.saldo;
    } else {
      return `O valor depósito não pode ser R$ 0,00.`;
    }
  }

  sacar(valor: number): number | string {
    
    if (valor > this.saldo) {
      return `Saque indisponível. Saldo atual R$${this.saldo}.`;
    } else {
      this.saldo = this.saldo - valor;
      return this.saldo;
    }
  }
}

class Cliente {
  nome: string;
  cpf: string;
  nasc: Date;
  nomeMae: string;
  conta: ContaBancaria;

  constructor(
    nome: string,
    cpf: string,
    nasc: Date,
    nomeMae: string,
    conta: ContaBancaria
  ) {
    this.nome = nome;
    this.cpf = cpf;
    this.nasc = nasc;
    this.nomeMae = nomeMae;
    this.conta = conta;
  }
}

const contaBancaria = new ContaBancaria(0);
const cliente = new Cliente(
  "Calor",
  "541.395.608-86",
  new Date(2003, 9, 10),
  "Fidelice",
  contaBancaria
);

const saldoDeposito = cliente.conta.depositar(100);
console.log(
  `Depósito de R$100,00 realizado. Novo saldo: R$${cliente.conta.saldo.toFixed(2)}`
);

const saldoSaque = cliente.conta.sacar(50);
console.log(`Saque de R$50,00 realizado. Novo saldo: R$${cliente.conta.saldo.toFixed(2)}`);

const saqueIndisponivel = cliente.conta.sacar(60);
console.log(`Tentativa de Saque de R$60,00. Resultado: ${saqueIndisponivel}`);
console.log(`Saldo Final: R$${cliente.conta.saldo.toFixed(2)}`);
