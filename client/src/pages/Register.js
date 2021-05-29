import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'

function Register () {
  const defaultFormState = {
    username: '',
    email: '',
    password: '',
    confirmPass: ''
  }
  const [form, setForm] = useState(defaultFormState)

  function onSubmit (evt) {
    evt.preventDefault()

    console.log('form submiitted!', form)
    setForm(defaultFormState)
  }

  function onChange (evt) {
    const { name, value } = evt.target

    setForm({
      ...form,
      [name]: value
    })
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Input
        label='Username'
        placeholder='Username'
        name='username'
        value={form.username}
        onChange={onChange}
      />
      <Form.Input
        label='Email'
        placeholder='Email'
        name='email'
        value={form.email}
        onChange={onChange}
      />
      <Form.Input
        label='Password'
        placeholder='Password'
        name='password'
        value={form.password}
        onChange={onChange}
      />
      <Form.Input
        label='Confirm Password'
        placeholder='Confirm Password'
        name='confirmPass'
        value={form.confirmPass}
        onChange={onChange}
      />
      <Button primary>
        Register
      </Button>
    </Form>
  )
}

export default Register
