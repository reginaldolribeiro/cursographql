module.exports = {
  precoComDesconto(produto){
      if(produto.desconto){
          return produto.preco * (1 - produto.desconto/100)
      } else {
          produto.preco
      }
  }
}