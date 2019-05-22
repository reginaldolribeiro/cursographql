const { ApolloServer, gql } = require("apollo-server");

const usuarios = [
  {
    id: 1,
    nome: "Joao Silva",
    email: "jsilva@gmail.com",
    idade: 29,
    perfil_id: 1
  },
  {
    id: 2,
    nome: "Rafael Junior",
    email: "rafaeljunior@gmail.com",
    idade: 31,
    perfil_id: 2
  },
  {
    id: 3,
    nome: "Daniela Smith",
    email: "danismith@gmail.com",
    idade: 24,
    perfil_id: 1
  }
];

const perfis = [
  {
    id: 1,
    nome: "Comum"
  },
  {
    id: 2,
    nome: "Administrador"
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
    perfil: Perfil
  }

  type Perfil {
    id: ID
    nome: String
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
    usuario(id: ID): Usuario
    perfis: [Perfil]
    perfil(id: ID): Perfil
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
    },
    perfil(usuario) {
      const selecionados = perfis.filter(p => p.id == usuario.perfil_id);
      return selecionados ? selecionados[0] : null;
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
    },
    usuario(_, args) {
      const selecionados = usuarios.filter(u => u.id == args.id);
      return selecionados ? selecionados[0] : null;
    },
    perfis() {
      return perfis;
    },
    perfil(_, args) {
      const selecionados = perfis.filter(p => p.id == args.id);
      return selecionados ? selecionados[0] : null;
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
