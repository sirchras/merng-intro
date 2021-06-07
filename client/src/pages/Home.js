import React from 'react'
import { useQuery } from '@apollo/client'
import { Container, Comment, Header, Loader, Divider, Icon } from 'semantic-ui-react'

import { FETCH_POSTS_QUERY } from '../graphql/posts'
import Post from '../components/Post'

function Home () {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY)
  const posts = data?.getPosts

  return (
    <Container text>
      <Divider horizontal>
        <Header as='h3'>
          <Icon name='discussions' />
          Recent Posts
        </Header>
      </Divider>
      { loading && <Loader active inline='centered' /> }
      { posts && (
        <Comment.Group size='large' style={{ maxWidth: '100%' }}>
          {
            posts.map(post => (
              <Post key={post.id} post={post} />
            ))
          }
        </Comment.Group>

      )}
    </Container>
  )
}

export default Home
