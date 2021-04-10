const Post = require('../../models/Post')

async function getPosts () {
  try {
    const posts = await Post.find()
    return posts
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  getPosts
}
