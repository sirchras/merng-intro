import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import decode from 'jwt-decode'

function getUser () {
  const token = localStorage.getItem('token')
  if (!token) return null

  const decoded = decode(token)
  if (decoded.exp * 1000 < Date.now()) {
    localStorage.removeItem('token')
    return null
  } else {
    return decoded
  }
}

const AuthContext = createContext()

function AuthProvider ({ children }) {
  const [user, setUser] = useState(getUser())

  const login = (user) => {
    localStorage.setItem('token', user.token)
    setUser(user)
  }
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export { AuthProvider, AuthContext }
