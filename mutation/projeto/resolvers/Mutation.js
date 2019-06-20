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