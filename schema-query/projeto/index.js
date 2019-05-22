const { ApolloServer, gql } = require("apollo-server");

const usuarios = [
  {
    id: 1,
    nome: "Joao Silva",
    email: "jsilva@gmail.com",
    idade: 29
  },
  {
    id: 2,
    nome: "Rafael Junior",
    email: "rafaeljunior@gmail.com",
    idade: 31
  },
  {
    id: 3,
    nome: "Daniela Smith",
    email: "danismith@gmail.com",
    idade: 24
  }
];

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
    numerosMegaSena: [Int!]!
    usuarios: [Usuario]
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
    },
    numerosMegaSena() {
      const crescente = (a, b) => a - b;
      return Array(6)
        .fill(0)
        .map(() => parseInt(Math.random() * 60 + 1))
        .sort(crescente);
    },
    usuarios() {
      return usuarios;
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
