const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`

const resolvers = {
  Query: {
    sayHi: () => 'hello world!'
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

module.exports = server
