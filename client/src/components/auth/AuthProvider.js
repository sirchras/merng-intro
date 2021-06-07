import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

const AuthContext = createContext({
  user: null,
  login: (user) => {},
  logout: () => {}
})

function reducer (state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}

function AuthProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, { user: null })

  function login (user) {
    dispatch({ type: 'LOGIN', payload: user })
  }

  function logout () {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export { AuthProvider, AuthContext }
