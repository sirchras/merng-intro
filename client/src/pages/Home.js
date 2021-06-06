import React from 'react'
import { useQuery } from '@apollo/client'
import { Container, Comment, Header, Loader } from 'semantic-ui-react'

import { FETCH_POSTS_QUERY } from '../api/posts'
import Post from '../components/Post'

function Home () {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY)
  const posts = data?.getPosts

  return (
    <Container>
      <Header as='h1' textAlign='center' dividing>
        Recent Posts
      </Header>
      { loading && <Loader active inline='centered' /> }
      { posts && (
        <Comment.Group size='massive' style={{ maxWidth: '100%' }}>
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
