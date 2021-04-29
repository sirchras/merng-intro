const { UserInputError, AuthenticationError } = require('apollo-server')

const Post = require('../../models/Post')
const checkAuth = require('../../utils/checkAuth')

module.exports = {
  mutations: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context)

      if (!body.trim()) {
        throw new UserInputError('Empty comment', {
          errors: { body: 'Comment body must not be empty' }
        })
      }

      const post = await Post.findById(postId)
      if (!post) throw new UserInputError('Post not found')

      post.comments.unshift({
        body,
        username,
        createdAt: new Date().toISOString()
      })
      await post.save()
      return post
    },

    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = checkAuth(context)

      const post = await Post.findById(postId)
      if (!post) throw new UserInputError('Post not found')

      const { comments } = post
      const idx = comments.findIndex(comment => comment.id === commentId)
      if (idx < 0) throw new UserInputError('Comment not found')

      if (username !== comments[idx].username) {
        throw new AuthenticationError('Action not allowed')
      }

      comments.splice(idx, 1)
      await post.save()
      return post
    }
  }
}
