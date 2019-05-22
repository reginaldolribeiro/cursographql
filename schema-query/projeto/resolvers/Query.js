const { usuarios, perfis } = require("../data/db");

module.exports = {
  ola() {
    return "Basta retornar uma string";
  },
  horaCerta() {
    // return `${new Date()}`;
    return new Date();
  },
  usuarioLogado() {
    return {
      id: 1,
      nome: "Ana da Web",
      email: "anadaweb@gmail.com",
      idade: 23,
      salario_real: 1245.45,
      vip: true
    };
  },
  produtoEmDestaque() {
    return {
      nome: "Produto",
      preco: 100.0,
      desconto: 0.5
    };
  },
  numerosMegaSena() {
    const crescente = (a, b) => a - b;
    return Array(6)
      .fill(0)
      .map(() => parseInt(Math.random() * 60 + 1))
      .sort(crescente);
  },
  usuarios() {
    return usuarios;
  },
  usuario(_, args) {
    const selecionados = usuarios.filter(u => u.id == args.id);
    return selecionados ? selecionados[0] : null;
  },
  perfis() {
    return perfis;
  },
  perfil(_, args) {
    const selecionados = perfis.filter(p => p.id == args.id);
    return selecionados ? selecionados[0] : null;
  }
};
