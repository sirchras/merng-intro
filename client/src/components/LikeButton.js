import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Comment, Icon } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

function LikeButton ({ user, post: { id, likes, likeCount } }) {
  const history = useHistory()
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    user && setLiked(!!likes.find(({ username }) => username === user.username))
    console.log('post liked?', liked)
  }, [user, likes])

  function onClick (evt) {
    evt.preventDefault()

    if (!user) {
      history.push('/login')
      return null
    }

    console.log('liked post')
  }

  return (
    <Comment.Action onClick={onClick}>
      <Icon name='like' color={liked ? 'red' : ''} />
      {
        `${likeCount} Like${likeCount !== 1 ? 's' : ''}`
      }
    </Comment.Action>
  )
}

LikeButton.propTypes = {
  post: {
    id: PropTypes.string,
    likes: PropTypes.object,
    likeCount: PropTypes.number
  },
  user: PropTypes.object
}

export default LikeButton
