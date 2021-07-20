import React from 'react'
import { useMutation } from '@apollo/client'
import { Button, Form, Message, Segment } from 'semantic-ui-react'

import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from '../graphql/posts'
import useForm from '../hooks/useForm'

function PostForm () {
  const { onChange, onSubmit, form } = useForm(() => {
    createPost().catch(console.error)
    form.body = ''
  }, { body: '' })

  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
    update (proxy, result) {
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY })
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts]
        }
      })
    },
    variables: form
  })
  const errMsg = error?.graphQLErrors[0].message

  return (
    <Segment basic>
      <Form
        onSubmit={onSubmit}
        className={`${error ? 'error' : ''}${loading ? ' loading' : ''}`}
      >
        <Form.TextArea
          placeholder={'What\'s up?'}
          name='body'
          onChange={onChange}
          value={form.body}
          error={!!error}
          required
        />
        { error && <Message error list={[errMsg]} /> }
        <Button color='purple'>
          Post
        </Button>
      </Form>
    </Segment>
  )
}

export default PostForm
