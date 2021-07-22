import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { DateTime } from 'luxon'
import { Comment, Icon } from 'semantic-ui-react'

import { AuthContext } from './auth/AuthProvider'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'

function PostItem ({ post }) {
  const { user } = useContext(AuthContext)
  const { id, username, createdAt, body, likes, likeCount, commentCount } = post
  const dt = DateTime.fromISO(createdAt)

  function commentPost (evt) {
    console.log('comment on post')
  }

  return (
    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/large/patrick.png' />
      <Comment.Content>
        <Comment.Author as='a'>{ username }</Comment.Author>
        <Comment.Metadata
          as={Link}
          to={`/post/${id}`}
          title={dt.toLocaleString(DateTime.DATETIME_FULL)}
        >
          {
            DateTime.now().diff(dt).as('days') > 2
              ? dt.toLocaleString(DateTime.DATE_MED)
              : dt.toRelative()
          }
        </Comment.Metadata>
        <Comment.Text>{ body }</Comment.Text>
        <Comment.Actions>
          <LikeButton
            user={user}
            post={{ id, likes, likeCount }}
          />
          <Comment.Action onClick={commentPost}>
            <Icon name='reply' />
            {
              `${commentCount} Comment${commentCount !== 1 ? 's' : ''}`
            }
          </Comment.Action>
          {
            user?.username === username && <DeleteButton postId={id}/>
          }
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  )
}

PostItem.propTypes = {
  post: PropTypes.object
}

export default PostItem
