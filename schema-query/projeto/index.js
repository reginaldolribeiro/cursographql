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
  }

  # Pontos de entrada da sua API;
  type Query {
    ola: String!
    # horaCerta: String
    horaCerta: Date!
    usuarioLogado: Usuario
  }
`;

const resolvers = {
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
        salario: 1245.45,
        vip: true
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
