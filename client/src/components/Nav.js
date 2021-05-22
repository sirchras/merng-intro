import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

function Nav () {
  const page = (useLocation().pathname.substring(1) || 'home')
  const [activeItem, setActiveItem] = useState(page)
  const handleItemClick = (e, { name }) => setActiveItem(name)

  return (
    <Menu pointing secondary color='purple'>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to='/'
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to='/login'
        />
        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to='/register'
        />
      </Menu.Menu>
    </Menu>
  )
}

export default Nav
