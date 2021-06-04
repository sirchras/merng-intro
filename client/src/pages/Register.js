import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Container, Form, Header } from 'semantic-ui-react'

import { REGISTER_USER } from '../api/auth'

function Register () {
  const defaultFormState = {
    username: '',
    email: '',
    password: '',
    confirmPass: ''
  }
  const [form, setForm] = useState(defaultFormState)
  // eslint-disable-next-line no-unused-vars
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update (proxy, result) {
      console.log(result)
    },
    variables: form
  })

  function onSubmit (evt) {
    evt.preventDefault()

    console.log('form submiitted!', form)
    registerUser()
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
      <Form onSubmit={onSubmit}>
        <Form.Input
          label='Username'
          placeholder='Username'
          name='username'
          value={form.username}
          onChange={onChange}
          // required
          />
        <Form.Input
          label='Email'
          placeholder='Email'
          name='email'
          value={form.email}
          onChange={onChange}
          // required
          />
        <Form.Input
          label='Password'
          placeholder='Password'
          name='password'
          value={form.password}
          onChange={onChange}
          // required
          />
        <Form.Input
          label='Confirm Password'
          placeholder='Confirm Password'
          name='confirmPass'
          value={form.confirmPass}
          onChange={onChange}
          // required
          />
        <Button primary>
          Register
        </Button>
      </Form>
    </Container>
  )
}

export default Register
