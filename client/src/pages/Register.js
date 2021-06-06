import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Container, Form, Header, Message } from 'semantic-ui-react'

import { REGISTER_USER } from '../api/auth'

const defaultFormState = {
  username: '',
  email: '',
  password: '',
  confirmPass: ''
}

function Register () {
  const [form, setForm] = useState(defaultFormState)
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    update (proxy, result) {
      console.log(result)
    },
    variables: form
  })
  const errors = error?.graphQLErrors[0].extensions.exception.errors

  function onSubmit (evt) {
    evt.preventDefault()

    console.log('form submiitted!', form)
    registerUser()
      .catch(console.error)

    // setForm(defaultFormState)
  }

  function onChange (evt) {
    const { name, value } = evt.target

    setForm({
      ...form,
      [name]: value
    })
  }

  return (
    <Container text>
      <Header as='h1' textAlign='center' dividing>
        Register
      </Header>
      <Form
        onSubmit={onSubmit}
        className={loading ? 'loading' : (error ? 'error' : '')}
      >
        <Form.Input
          label='Username'
          placeholder='Username'
          name='username'
          value={form.username}
          error={!!errors?.username}
          onChange={onChange}
          // required
        />
        <Form.Input
          label='Email'
          placeholder='Email'
          name='email'
          type='email'
          value={form.email}
          error={!!errors?.email}
          onChange={onChange}
          // required
        />
        <Form.Input
          label='Password'
          placeholder='Password'
          name='password'
          type='password'
          value={form.password}
          error={!!errors?.password}
          onChange={onChange}
          // required
        />
        <Form.Input
          label='Confirm Password'
          placeholder='Confirm Password'
          name='confirmPass'
          type='password'
          value={form.confirmPass}
          error={!!errors?.confirmPass}
          onChange={onChange}
          // required
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
        <Button primary>
          Register
        </Button>
      </Form>
    </Container>
  )
}

export default Register
