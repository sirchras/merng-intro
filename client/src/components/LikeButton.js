import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Comment, Icon } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { LIKE_POST_MUTATION } from '../graphql/posts'

function LikeButton ({ user, post: { id, likes, likeCount } }) {
  const history = useHistory()
  const [liked, setLiked] = useState(false)
  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id }
  })

  useEffect(() => {
    if (!user) {
      setLiked(false)
      return
    }

    setLiked(!!likes.find(({ username }) => username === user.username))
  }, [user, likes])

  function onClick (evt) {
    evt.preventDefault()

    if (!user) {
      history.push('/login')
      return null
    }

    likePost().catch(console.error)
  }

  return (
    <Comment.Action onClick={onClick}>
      { liked
        ? <Icon name='like' color='red' />
        : <Icon name='like' />
      }
      {
        `${likeCount} Like${likeCount !== 1 ? 's' : ''}`
      }
    </Comment.Action>
  )
}

LikeButton.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object
}

export default LikeButton
