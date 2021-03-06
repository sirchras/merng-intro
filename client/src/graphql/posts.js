import { gql } from '@apollo/client'

const FETCH_POSTS_QUERY = gql`
  query fetchPosts {
    getPosts {
      id body createdAt username likeCount
      likes {
        username
      }
      commentCount
      comments {
        id username createdAt body
      }
    }
  }
`

const FETCH_POST_QUERY = gql`
  query fetchPost($postId: ID!) {
    getPost(postId: $postId) {
      id body createdAt username likeCount
      likes {
        username
      }
      commentCount
      comments {
        id username createdAt body
      }
    }
  }
`

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id body createdAt username likeCount
      likes {
        username
      }
      commentCount
      comments {
        id username createdAt body
      }
    }
  }
`

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`

const LIKE_POST_MUTATION = gql`
  mutation toggleLikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id username
      }
      likeCount
    }
  }
`

export {
  FETCH_POSTS_QUERY,
  FETCH_POST_QUERY,
  CREATE_POST_MUTATION,
  DELETE_POST_MUTATION,
  LIKE_POST_MUTATION
}
