const db = require('../config/db')

const usuario = {
    nome: "Ana",
    email: "ana@empresa.com.br",
    senha: "123"
}

// db('usuarios').insert(novoUsuario)
//     .then(res => console.log(res))
//     .catch(err => console.log(err.sqlMessage))
//     .finally(() => db.destroy())

// db('usuarios').where({ email: "ana@empresa.com.br" })
//     .first()
//     .then(res => console.log(res))
//     .finally(() => db.destroy())

// const usuarioAlterado = db('usuarios').where({ email: "ana@empresa.com.br"})
//             .update({
//                 nome: "Ana alterada3",
//                 email: "ana@empresa.com.br"
//             })
//             .then(res => console.log(res))
//             .finally(() => db.destroy())

async function salvarUsuario(nome, email, senha){
    
    const usuario = await db('usuarios')
        .where({ email: email })
        .first()
    
    // update
    if(usuario){
        
        await db('usuarios').where({ email: email})
            .update({
                nome,
                email,
                senha
            })

    // insert
    }else{
        
        await db('usuarios').insert({
            nome, email, senha
        })

    }
      
    return await db('usuarios').where({ email: email })
            .first()
            //.finally(() => db.destroy())

}

//salvarUsuario("Reginaldo Luiz Ribeiro Filho", "reginaldo@empresa.com.br", "123456")
//    .then(usuario => console.log(usuario))

async function salvarPerfil(nome, rotulo){

    const perfil = await db('perfis').where({ nome })
        .first()
        //.finally(() => db.destroy())

    if(perfil){
        
        await db('perfis').where({ nome })
            .update({ nome, rotulo})

    }else{
        await db('perfis').insert({
            nome,
            rotulo
        })
    }

    return await db('perfis').where({ nome })
        .first()
        //.finally(() => db.destroy())
}

// salvarPerfil('user','Usuario')
//     .then(res => console.log(res))

async function adicionarPerfis(usuario, ...perfis){
    
    for(perfil of perfis) {
        console.log(perfil)
        const { nome } = perfil
        console.log(nome)
        // const perfilBuscado = await db('perfis')
        //                                 .select('id')
        //                                 .where({ nome })
        //                                 .first()
        //                                 .then(res => console.log(res))
        // console.log(perfilBuscado)
    }

}

adicionarPerfis(usuario, [{ nome: "admin", rotulo: "Administrador"},{ nome: "xxxxx", rotulo: "Administrador"}])
    .then(res => console.log(res))
    .finally(() => db.destroy())

// db('perfis')
//     .select('id')
//     .where({ nome: "admin" })
//     .first()
//     .then(res => console.log(res))
//     .finally(() => db.destroy())

// async function executar(){
//     const usuario = await salvarUsuario("Ana", "ana@empresa.com.br", "123")
//     const perfilA = await salvarPerfil("rh", "Pessoal")
//     //const perfilB = await salvarPerfil("fin", "Financeiro")

//     console.log(usuario)
//     console.log(perfilA)
//     //console.log(perfilB)

//     //await adicionarPerfis(usuario, perfilA, perfilB)
// }

// executar()
//     .catch(err => console.log(err))
//     .finally(() => db.destroy())