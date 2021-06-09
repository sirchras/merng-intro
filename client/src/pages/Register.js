import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { Button, Container, Form, Header, Message } from 'semantic-ui-react'

import { REGISTER_USER } from '../graphql/auth'
import { AuthContext } from '../components/auth/AuthProvider'
import useForm from '../hooks/useForm'

function Register () {
  const context = useContext(AuthContext)
  const history = useHistory()

  const { onChange, onSubmit, form } = useForm(() => registerUser().catch(console.error), {
    username: '',
    email: '',
    password: '',
    confirmPass: ''
  })

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    update (_, { data: { login: user } }) {
      context.login(user)
      history.push('/')
    },
    variables: form
  })
  const errors = error?.graphQLErrors[0].extensions.exception.errors

  return (
    <Container text>
      <Header as='h1' textAlign='center' dividing>
        Register
      </Header>
      <Form
        onSubmit={onSubmit}
        className={`${error ? 'error' : ''}${loading ? ' loading' : ''}`}
      >
        <Form.Input
          label='Username'
          placeholder='Username'
          name='username'
          value={form.username}
          error={!!errors?.username}
          onChange={onChange}
          required
        />
        <Form.Input
          label='Email'
          placeholder='Email'
          name='email'
          type='email'
          value={form.email}
          error={!!errors?.email}
          onChange={onChange}
          required
        />
        <Form.Input
          label='Password'
          placeholder='Password'
          name='password'
          type='password'
          value={form.password}
          error={!!errors?.password}
          onChange={onChange}
          required
        />
        <Form.Input
          label='Confirm Password'
          placeholder='Confirm Password'
          name='confirmPass'
          type='password'
          value={form.confirmPass}
          error={!!errors?.confirmPass}
          onChange={onChange}
          required
        />
        {
          error && (
            <Message error>
              <Message.List>
                {
                  Object.values(errors).map(errMsg => (
                    <Message.Item key={errMsg}>{errMsg}</Message.Item>
                  ))
                }
              </Message.List>
            </Message>
          )
        }
        <Button color='purple'>
          Register
        </Button>
      </Form>
    </Container>
  )
}

export default Register
