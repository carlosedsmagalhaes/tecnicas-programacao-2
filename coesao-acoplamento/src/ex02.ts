class CarrinhoDeCompras {
  itens: string[];

  constructor(itens: string[]) {
    this.itens = itens;
  }

  adicionarItem(item: string) {
    this.itens.push(item);
    return this.itens;
  }

  removerItem(item: string) {
    const indexToRemove = this.itens.indexOf(item);

    if (indexToRemove > -1) {
      this.itens.splice(indexToRemove, 1);
    }

    return this.itens;
  }

  imprimir(): string {
    return `**ITENS**\n${this.itens.join(", ")}`;
  }
}

const carrinho = new CarrinhoDeCompras([]);
carrinho.adicionarItem("Camiseta");
carrinho.adicionarItem("Calça");
carrinho.adicionarItem("Meia");
carrinho.removerItem("Camiseta");
console.log(carrinho.imprimir());
