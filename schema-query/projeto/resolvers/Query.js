const { usuarios, perfis } = require('../data/db');

module.exports = {
    ola(){
        return 'Hello'
    },
    horaAtual(){
        return new Date
    },
    usuarioLogado(){
        return {
            id: 1,
            nome: 'Reginaldo',
            email: 'reginaldolribeiro@gmail.com',
            idade: 33,
            salario_real:123.4,
            vip: true
        }
    },
    produtoEmDestaque(){
        return {
            nome: 'Moto X Play',
            preco: 300.0,
            desconto: 20.0              
        }
    },
    numerosMegaSena(){
        //return [4,8,13,27,33,54]
        const crescente = (a,b) => a -b;
        return Array(6).fill(0)
            .map(n => parseInt(Math.random()*60 + 1))
            .sort(crescente);
    },
    usuarios(){
        return usuarios;
    },
    usuario(_, args){
        const selecionados = usuarios.filter(u => u.id == args.id)
        return selecionados ? selecionados[0] : null
    },
    perfis(){
        return perfis
    },
    perfil(_, args){
        const selecionados = perfis.filter(p => p.id == args.id)
        return selecionados ? selecionados[0] : null
    }
}