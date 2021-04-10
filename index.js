const { apollo } = require('apollo-server')
const gql = require('graphql-tag')

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

const server = new apollo({
  typeDefs,
  resolvers
})

const port = process.env.PORT || 3000

server.listen({ port })
  .then(res => {
    console.log(`server running @ ${res.url}`)
  })
