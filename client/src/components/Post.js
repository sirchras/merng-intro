import React from 'react'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'
import { Comment, Icon } from 'semantic-ui-react'

function Post ({ post }) {
  const { username, createdAt, body, likeCount, commentCount } = post
  const dt = DateTime.fromISO(createdAt)

  return (
    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/large/patrick.png' />
      <Comment.Content>
        <Comment.Author as='a'>{ username }</Comment.Author>
        <Comment.Metadata>
          <div title={dt.toLocaleString(DateTime.DATETIME_FULL)}>
            {
              DateTime.now().diff(dt).as('days') > 2
                ? dt.toLocaleString(DateTime.DATE_MED)
                : dt.toRelative()
            }
          </div>
        </Comment.Metadata>
        <Comment.Text>{ body }</Comment.Text>
        <Comment.Actions>
          <Comment.Action>
            <Icon name='like' />
            {
              `${likeCount} Like${likeCount !== 1 ? 's' : ''}`
            }
          </Comment.Action>
          <Comment.Action>
            <Icon name='reply' />
            {
              `${commentCount} Comment${commentCount !== 1 ? 's' : ''}`
            }
          </Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  )
}

Post.propTypes = {
  post: PropTypes.object
}

export default Post
