const { ApolloServer, gql } = require('apollo-server')
const port = process.env.PORT || 3000

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

/* eslint-disable
  no-console, promise/always-return, promise/catch-or-return
  ----------
  this is per the apollo-server docs, so temporarily disabling
*/
server.listen({ port })
  .then(({ url }) => {
    console.log(`🚀 server running @ ${url}`)
  })
