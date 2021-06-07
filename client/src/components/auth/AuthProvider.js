import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

const AuthContext = createContext()

function AuthProvider ({ children }) {
  const [user, setUser] = useState(null)

  const login = (user) => setUser(user)
  const logout = () => setUser(null)

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
