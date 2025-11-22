class Contato {
  nome: string;
  telefone: string;
  email: string;

  constructor(nome: string, telefone: string, email: string) {
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
  }
}

class Agenda {
  contatos: Contato[];

  constructor(contatos: Contato[]) {
    this.contatos = contatos;
  }

  adicionarContato(contato: Contato) {
    this.contatos.push(contato);
    return this.contatos;
  }

  removerContato(contato: Contato) {
    const indexToRemove = this.contatos.indexOf(contato);

    if (indexToRemove > -1) {
      this.contatos.splice(indexToRemove, 1);
    }

    return this.contatos;
  }
}

const contato1 = new Contato(
    "Alice Silva", 
    "(11) 98765-4321", 
    "alice.silva@email.com"
);

const contato2 = new Contato(
    "Bruno Mendes", 
    "(21) 99999-8888", 
    "bruno.mendes@email.com"
);

const contato3 = new Contato(
    "Carla Oliveira", 
    "(31) 91234-5678", 
    "carla.oliveira@email.com"
);


const minhaAgenda = new Agenda([contato1, contato2]);

console.log("### Agenda inicial ###");
console.log(minhaAgenda.contatos);
console.log("--------------------------");



console.log("###  Adicionando Contato (Carla Oliveira) ###");
minhaAgenda.adicionarContato(contato3);
console.log(minhaAgenda.contatos);
console.log("--------------------------");

console.log("### Removendo Contato (Alice Silva) ###");
minhaAgenda.removerContato(contato1);
console.log(minhaAgenda.contatos);
console.log("--------------------------");
