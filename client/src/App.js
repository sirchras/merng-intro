import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

import 'semantic-ui-css/semantic.min.css'
import './App.css'
import { AuthProvider } from './components/auth/AuthProvider'
import Nav from './components/Nav'

function App () {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Nav />
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
        </Container>
      </Router>
    </AuthProvider>
  )
}

export default App
