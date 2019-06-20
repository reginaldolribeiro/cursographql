const { usuarios, proximoId } = require('../data/db')

module.exports = {
    novoUsuario(_, args){

        const emailExistente = usuarios
            .some(u => u.email === args.email)

        if(emailExistente){
            throw new Error('Email ja cadastrado')
        }

        const novo = {
            id: proximoId(),
            ...args,
            perfil_id: 1,
            status: 'ATIVO'
        }
        console.log('Mutation ***')
        usuarios.push(novo)
        return novo
    },

    excluirUsuario(_, { id }){
        const i = usuarios.findIndex(u => u.id === id)
        if(i < 0) return null
        const excluidos = usuarios.splice(i, 1)
        return excluidos ? excluidos[0] : null
    },

    alterarUsuario(_, args){
        const i = usuarios.findIndex(u => u.id === args.id)
        if(i < 0) return null

        // *** Alternativa 1
        // const usuario = {
        //     ...usuarios[i],
        //     ...args
        // }
        // removendo elemento de indice "i: e adicionando novo elemento "usuario"
        //usuarios.splice(i, 1, usuario)
        //return usuario

        // *** Alternativa 2
        usuarios[i].nome = args.nome
        usuarios[i].email = args.email
        usuarios[i].idade = args.idade
        return usuarios[i]

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
}