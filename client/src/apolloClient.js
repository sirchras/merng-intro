import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

export default new ApolloClient({
  link: createHttpLink({
    // todo: should be moved to env/config
    uri: 'http://localhost:4000'
  }),
  cache: new InMemoryCache()
})
