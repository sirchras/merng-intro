import { gql } from '@apollo/client'

const REGISTER_USER = gql`
  mutation registerUser (
    $username: String!
    $email: String!
    $password: String!
    $confirmPass: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPass: $confirmPass
      }
    ) {
      id email username createdAt token
    }
  }
`

const LOGIN_USER = gql`
  mutation loginUser (
    $username: String!
    $password: String!
  ) {
    login (username: $username password: $password) {
      id email username createdAt token
    }
  }
`

export { REGISTER_USER, LOGIN_USER }
