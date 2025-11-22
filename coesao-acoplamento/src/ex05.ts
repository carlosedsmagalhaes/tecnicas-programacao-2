class AutenticacaoDeUsuario {
  usuarios: Map<string, string>;

  constructor(usuarios: Map<string, string>) {
    this.usuarios = usuarios;
  }

  registrarUsuario(usuario: string, senha: string): string {
    if (usuario && senha) {
      this.usuarios.set(usuario, senha);
    } else {
      return `Dados incompletos`;
    }

    return `Usuário inserido com sucesso.`;
  }

  autenticarUsuario(usuario: string, senha: string):boolean{
    const senhaUsuario = this.usuarios.get(usuario)
    return senhaUsuario == senha

  }
}


const autenticacao = new AutenticacaoDeUsuario(new Map<string, string>);
autenticacao.registrarUsuario("alice", "senha123");
autenticacao.registrarUsuario("bob", "outrasenha");
const usuarioAutenticado = autenticacao.autenticarUsuario("alice", "senha123");
if(usuarioAutenticado){
console.log("Usuário autenticado com sucesso!");
} else {
console.log("Falha na autenticação do Usuário!");
}