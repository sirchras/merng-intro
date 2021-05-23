import React from 'react'
import PropTypes from 'prop-types'
import { Feed, Icon } from 'semantic-ui-react'

function Post ({ post }) {
  const { username, createdAt, body, likeCount } = post

  return (
    <Feed.Event>
      <Feed.Label image='https://react.semantic-ui.com/images/avatar/large/patrick.png' />
      <Feed.Content>
        <Feed.Summary
          user={username}
          date={createdAt}
        />
        <Feed.Extra text content={body} />
        <Feed.Meta>
          <Feed.Like>
            <Icon name='like' />
            {
              `${likeCount} Like${likeCount !== 1 ? 's' : ''}`
            }
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  )
}

Post.propTypes = {
  post: PropTypes.object
}

export default Post
