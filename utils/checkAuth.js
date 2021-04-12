const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server')

module.exports = (context) => {
  const authHeader = context.req.headers.authorization
  if (!authHeader) throw new AuthenticationError('Missing authorization header')

  const token = authHeader.split('Bearer ')[1]
  if (!token) throw new AuthenticationError('Missing authentication token')

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    return user
  } catch (err) {
    throw new AuthenticationError('Invalid/Expired token')
  }
}
