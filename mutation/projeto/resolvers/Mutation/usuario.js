const { usuarios, proximoId } = require("../../data/db");

function indiceUsuario(filtro) {
  if (!filtro) return -1;
  const { id, email } = filtro;
  if (id) {
    return usuarios.findIndex(u => u.id === id);
  } else if (email) {
    return usuarios.findIndex(u => u.email === email);
  }
  return -1;
}

module.exports = {
  novoUsuario(_, { dados }) {
    const emailExistente = usuarios.some(u => u.email === dados.email);

    if (emailExistente) {
      throw new Error("Email ja cadastrado");
    }

    const novo = {
      id: proximoId(),
      ...dados,
      perfil_id: 1,
      status: "ATIVO"
    };
    console.log("Mutation ***");
    usuarios.push(novo);
    return novo;
  },

  excluirUsuario(_, { filtro }) {
    const i = indiceUsuario(filtro);
    if (i < 0) return null;
    const excluidos = usuarios.splice(i, 1);
    return excluidos ? excluidos[0] : null;
  },

  alterarUsuario(_, { filtro, dados }) {
    const i = indiceUsuario(filtro);
    if (i < 0) return null;

    // *** Alternativa 1
    // const usuario = {
    //     ...usuarios[i],
    //     ...args
    // }
    // removendo elemento de indice "i: e adicionando novo elemento "usuario"
    //usuarios.splice(i, 1, usuario)
    //return usuario

    // *** Alternativa 2
    usuarios[i].nome = dados.nome;
    usuarios[i].email = dados.email;
    if (dados.idade) {
      usuarios[i].idade = dados.idade;
    }
    return usuarios[i];
  }

  // novoUsuario(_, { nome, email, idade }){
  //     const novo = {
  //         id: proximoId(),
  //         nome,
  //         email,
  //         idade,
  //         perfil_id: 1,
  //         status: 'ATIVO'
  //     }
  //     console.log('Mutation ***')
  //     usuarios.push(novo)
  //     return novo
  // }
};
