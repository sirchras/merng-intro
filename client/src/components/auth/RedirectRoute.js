import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

import { AuthContext } from './AuthProvider'

function RedirectRoute ({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={
        (props) => user
          ? <Redirect to='/' />
          : <Component {...props} />
      }
    />
  )
}

RedirectRoute.propTypes = {
  component: PropTypes.func.isRequired
}

export default RedirectRoute
