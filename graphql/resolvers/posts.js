const Post = require('../../models/Post')

module.exports = {
  queries: {
    getPosts: async () => {
      try {
        const posts = await Post.find()
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
  }
}
