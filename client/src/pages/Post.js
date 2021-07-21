import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Comment, Container, Header, Loader } from 'semantic-ui-react'

import { FETCH_POST_QUERY } from '../graphql/posts'
import PostItem from '../components/PostItem'

function Post () {
  const { postId } = useParams()
  const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: { postId }
  })
  const post = data?.getPost

  return (
    <Container>
      <Header as='h1' textAlign='center' dividing>
        Thread
      </Header>
      { loading && <Loader active inline='centered' /> }
      { post && (
        <Comment.Group size='massive' style={{ maxWidth: '100%' }}>
          <PostItem key={post.id} post={post} />
        </Comment.Group>
      )}
    </Container>
  )
}

export default Post
