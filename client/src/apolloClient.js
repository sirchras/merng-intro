import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  // todo: should be moved to env/config
  uri: 'http://localhost:4000'
})

const authLink = setContext(() => {
  const token = localStorage.getItem('token')
  return ({
    headers: { Authorization: token ? `Bearer ${token}` : '' }
  })
})

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})
