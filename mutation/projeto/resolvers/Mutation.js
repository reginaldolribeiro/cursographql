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