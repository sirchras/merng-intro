import React from 'react'
import { useMutation } from '@apollo/client'
import { Button, Form, Segment } from 'semantic-ui-react'

import { CREATE_POST_MUTATION } from '../graphql/posts'
import useForm from '../hooks/useForm'

function PostForm () {
  const { onChange, onSubmit, form } = useForm(() => createPost, { body: '' })
  // eslint-disable-next-line no-unused-vars
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    update (_, result) {
      console.log(result)
    },
    variables: form
  })

  return (
    <Segment basic>
      <Form onSubmit={onSubmit}>
        <Form.TextArea
          placeholder={'What\'s up?'}
          name='body'
          onChange={onChange}
          value={form.body}
        />
        <Button color='purple'>
          Post
        </Button>
      </Form>
    </Segment>
  )
}

export default PostForm
