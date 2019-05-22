const { perfis } = require("../data/db");

module.exports = {
  salario(usuario) {
    return usuario.salario_real;
  },
  blabla(usuario) {
    return "Opa blablablah";
  },
  perfil(usuario) {
    const selecionados = perfis.filter(p => p.id == usuario.perfil_id);
    return selecionados ? selecionados[0] : null;
  }
};
