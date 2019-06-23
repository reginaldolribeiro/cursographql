const db = require('../config/db')

const novoUsuario = {
    nome: "Pedro",
    email: "pedro@empresa.com.br",
    senha: "123456"
}

async function exercicio(){
    //count
    const { quantidade } = await db('usuarios')
        .count('* as quantidade').first()        
    
    // inserir (se a tabela estiver vazia)
    if(quantidade === 0){
        await db('usuarios').insert(novoUsuario)
    }

    // consultar
    const { id } = await db('usuarios')
        .select('id').limit(1).first()
    
    // alterar
    await db('usuarios').where({ id: id})
        .update({ 
            nome: "Pedro Garcia",
            email: "pedro.garcia@empresa.com.br"
        })

    return db('usuarios').where({ id: id})

}

exercicio()
    .then(usuario => console.log(usuario))
    .finally(() => db.destroy())