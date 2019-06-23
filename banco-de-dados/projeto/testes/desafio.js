const db = require('../config/db')

async function salvarUsuario(nome, email, senha){
    
    let usuario = await db('usuarios')
        .where({ email: email })
        .first()    
    
    // insert
    if(!usuario){
                
        let [ id ] = await db('usuarios').insert({ nome, email, senha })
        usuario = db('usuarios').where({ id }).first()

    // update
    }else{        

        await db('usuarios')
            .where({ id: usuario.id})
            .update({
                nome,
                email,
                senha
            })
        usuario = { ...usuario, nome, email, senha }

    }
      
    return usuario

}

// salvarUsuario("Joao de Souza", "joaosouza@empresa.com.br", "123456")
//    .then(usuario => console.log(usuario))

async function salvarPerfil(nome, rotulo){

    let perfil = await db('perfis').where({ nome }).first()

    if(!perfil){
        
        let [ id ] = await db('perfis').insert({ nome, rotulo })        
        perfil = db('perfis').where({ id }).first()

    }else{
        
        await db('perfis').where({ id: perfil.id }).update({ nome, rotulo})
        perfil = { ...perfil, nome, rotulo }

    }

    return perfil
}

// salvarPerfil('teste','Teste')
//     .then(res => console.log(res))

async function adicionarPerfis(usuario, ...perfis){

    const usuario_id = usuario.id
    await db('usuarios_perfis').where({ usuario_id }).delete()

    for(perfil of perfis) {       
        const perfil_id = perfil.id
        await db('usuarios_perfis').insert({ usuario_id, perfil_id })
    }

}

// adicionarPerfis({ id: 2, nome: "Ana", email: "ana@empresa.com.br", senha: "123"}, 
//                  [{ id: 16, nome: "admin", rotulo: "Administrador"},{ id: 18, nome: "user", rotulo: "Usuario"}])
//     .then(res => console.log(res))
//     .finally(() => db.destroy())

async function executar(){
    const usuario = await salvarUsuario("Reginaldo Luiz Ribeiro Filho", "reginaldo@empresa.com.br", "123")
    const perfilA = await salvarPerfil("rh1", "Pessoal")
    const perfilB = await salvarPerfil("fin1", "Financeiro")

    console.log(usuario)
    console.log(perfilA)
    console.log(perfilB)

    await adicionarPerfis(usuario, perfilA, perfilB)
}

executar()
    .catch(err => console.log(err))
    .finally(() => db.destroy())