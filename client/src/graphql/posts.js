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

export { FETCH_POSTS_QUERY, CREATE_POST_MUTATION }
