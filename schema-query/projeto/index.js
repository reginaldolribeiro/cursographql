const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date

  type Usuario {
    id: ID
    nome: String!
    email: String!
    idade: Int
    salario: Float
    vip: Boolean
    blabla: String
  }

  type Produto {
    nome: String!
    preco: Float!
    desconto: Float
    precoComDesconto: Float
  }

  # Pontos de entrada da sua API;
  type Query {
    ola: String!
    # horaCerta: String
    horaCerta: Date!
    usuarioLogado: Usuario
    blabla: String
    produtoEmDestaque: Produto
  }
`;

const resolvers = {
  Produto: {
    precoComDesconto(produto) {
      if (produto.desconto) {
        return produto.preco * (1 - produto.desconto);
      } else {
        return produto.desconto;
      }
    }
  },
  Usuario: {
    salario(usuario) {
      return usuario.salario_real;
    },
    blabla(usuario) {
      return "Opa blablablah";
    }
  },
  Query: {
    ola() {
      return "Basta retornar uma string";
    },
    horaCerta() {
      // return `${new Date()}`;
      return new Date();
    },
    usuarioLogado() {
      return {
        id: 1,
        nome: "Ana da Web",
        email: "anadaweb@gmail.com",
        idade: 23,
        salario_real: 1245.45,
        vip: true
      };
    },
    produtoEmDestaque() {
      return {
        nome: "Produto",
        preco: 100.0,
        desconto: 0.5
      };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Executando em ${url}`);
});
