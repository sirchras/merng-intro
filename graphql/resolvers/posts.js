const { AuthenticationError } = require('apollo-server-errors')

const Post = require('../../models/Post')
const checkAuth = require('../../utils/checkAuth')

module.exports = {
  queries: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 })
        return posts
      } catch (err) {
        throw new Error(err)
      }
    },

    getPost: async (_, { postId }) => {
      try {
        const post = await Post.findById(postId)
        if (!post) throw new Error('Post not found')
        return post
      } catch (err) {
        throw new Error(err)
      }
    }
  },

  mutations: {
    createPost: async (_, { body }, context) => {
      const user = checkAuth(context)
      const post = await new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      }).save()

      return post
    },

    deletePost: async (_, { postId }, context) => {
      const user = checkAuth(context)

      try {
        const post = await Post.findById(postId)
        if (!post) throw new Error('Post not found')

        if (user.username !== post.username) throw new AuthenticationError('Action not allowed')

        await post.delete()
        return 'Post deleted'
      } catch (err) {
        throw new Error(err)
      }
    }
  }
}