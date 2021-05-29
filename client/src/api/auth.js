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

export { REGISTER_USER }
