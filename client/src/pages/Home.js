import React from 'react'
import { useQuery } from '@apollo/client'
import { Feed, Header } from 'semantic-ui-react'

import { FETCH_POSTS_QUERY } from '../api/posts'
import Post from '../components/Post'

function Home () {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY)
  const posts = data?.getPosts

  return (
    <Feed size='large'>
      <Header as='h1' dividing>
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
    </Feed>
  )
}

export default Home
