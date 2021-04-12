const posts = require('./posts')
const users = require('./users')

module.exports = {
  Query: {
    ...posts.queries
  },
  Mutation: {
    ...users.mutations,
    ...posts.mutations
  }
}
