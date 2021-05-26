import React from 'react'
import { useQuery } from '@apollo/client'
import { Comment, Header } from 'semantic-ui-react'

import { FETCH_POSTS_QUERY } from '../api/posts'
import Post from '../components/Post'

function Home () {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY)
  const posts = data?.getPosts

  return (
    <Comment.Group
      size='massive'
      style={{
        maxWidth: '100%'
      }}
    >
      <Header as='h1' textAlign='center' dividing>
        Recent Posts
      </Header>

      {
        loading
          ? <h3>Loading posts...</h3>
          : (
              posts.map(post => (
                <Post key={post.id} post={post} />
              ))
            )
      }
    </Comment.Group>
  )
}

export default Home
