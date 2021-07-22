import React from 'react'
import { Comment, Icon } from 'semantic-ui-react'

function DeleteButton () {
  return (
    <Comment.Action onClick={() => { console.log('delete post') }}>
      <Icon name='trash' />
    </Comment.Action>
  )
}

export default DeleteButton
