import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Comment, Confirm, Icon } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { DELETE_POST_MUTATION } from '../graphql/posts'

function DeleteButton ({ postId }) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: { postId },
    update () {
      setConfirmOpen(false)

      // todo: delete post from cache
    }
  })

  return (
    <>
      <Comment.Action onClick={() => setConfirmOpen(true)}>
        <Icon name='trash' />
      </Comment.Action>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  )
}

DeleteButton.propTypes = {
  postId: PropTypes.string
}

export default DeleteButton
