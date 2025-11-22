class Item {
  descricao: string;
  valor: number;
  quantidade: number;

  constructor(descricao: string, valor: number, quantidade: number) {
    this.descricao = descricao;
    this.valor = valor;
    this.quantidade = quantidade;
  }
}

class Carrinho {
  itens: Item[];

  constructor(itens: Item[]) {
    this.itens = itens;
  }

  adicionarItem(item: Item) {
    this.itens.push(item);
    return this.itens;
  }

  removerItem(item: Item) {
    const indexToRemove = this.itens.indexOf(item);

    if (indexToRemove > -1) {
      this.itens.splice(indexToRemove, 1);
    }

    return this.itens;
  }

  calcularTotal(): number {
    let total: number = 0;
    this.itens.forEach((e) => {
      total += e.quantidade * e.valor;
    });

    return total;
  }
}

class Pagamento{
    processarPagamento(total:number, forma:string): void{
        if (total <= 0) {
            console.log("O valor total não pode ser R$ 0,00");
            return;
        }

        console.log(`Pagamento de R$${total.toFixed(2)} em '${forma}' processado com sucesso!`);
    }
}

const carrinho = new Carrinho([]);
let item = new Item("Camiseta",50,2);
carrinho.adicionarItem(item);
item = new Item("Calça",130,1);
carrinho.adicionarItem(item);
item = new Item("Meia",20,3);
carrinho.adicionarItem(item);
const total = carrinho.calcularTotal();
console.log(total);
const pagamento = new Pagamento();
pagamento.processarPagamento(total,"dinheiro");