import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

import { AuthContext } from './auth/AuthProvider'

function Nav () {
  const { user, logout } = useContext(AuthContext)
  const page = useLocation().pathname

  const authed = (
    <Menu.Item
      name='logout'
      onClick={logout}
    />
  )
  const unAuthed = (<>
    <Menu.Item
      name='login'
      active={page === '/login'}
      as={Link}
      to='/login'
    />
    <Menu.Item
      name='register'
      active={page === '/register'}
      as={Link}
      to='/register'
    />
  </>)

  return (
    <Menu pointing secondary color='purple'>
      <Menu.Item
        name={user ? user.username : 'home'}
        active={page === '/'}
        as={Link}
        to='/'
      />
      <Menu.Menu position='right'>
        { user ? authed : unAuthed }
      </Menu.Menu>
    </Menu>
  )
}

export default Nav
