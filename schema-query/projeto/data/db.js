const usuarios = [
  {
      id: 1,
      nome: 'Reginaldo',
      email: 'reginaldo@gmail.com',
      idade:33,
      perfil_id: 1,
      status: 'ATIVO'
  },
  {
      id: 2,
      nome: 'Rafael',
      email: 'rafael@gmail.com',
      idade:36,
      perfil_id: 2,
      status: 'INATIVO'
  },
  {
      id: 3,
      nome: 'Dani',
      email: 'dani@gmail.com',
      idade:2,
      perfil_id: 1,
      status: 'BLOQUEADO'
  }
]

const perfis = [
  { id: 1, nome: 'Comum' },
  { id: 2, nome: 'Administrador' }
]

module.exports = { usuarios, perfis }