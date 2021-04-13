const posts = require('./posts')
const users = require('./users')
const comments = require('./comments')

module.exports = {
  Query: {
    ...posts.queries
  },
  Mutation: {
    ...users.mutations,
    ...posts.mutations,
    ...comments.mutations
  }
}
