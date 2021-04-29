const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

const User = require('../../models/User')
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators')

function generateToken (user) {
  const { id, email, username } = user
  return jwt.sign(
    { id, email, username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )
}

module.exports = {
  mutations: {
    login: async (_, { username, password }) => {
      const { valid, errors } = validateLoginInput(username, password)
      if (!valid) throw new UserInputError('Bad input', { errors })

      const user = await User.findOne({ username })
      if (!user) {
        throw new UserInputError('User not found', {
          errors: { general: 'User not found' }
        })
      }

      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        throw new UserInputError('Wrong credentials', {
          errors: { general: 'Wrong credentials' }
        })
      }

      const token = generateToken(user)
      return {
        ...user._doc,
        id: user._id,
        token
      }
    },

    register: async (_, args, context, info) => {
      const { username, email, password, confirmPass } = args.registerInput

      const { valid, errors } = validateRegisterInput(username, email, password, confirmPass)
      if (!valid) throw new UserInputError('Bad input', { errors })

      const user = await User.findOne({ username })
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: { username: 'This username is taken' }
        })
      }

      const hash = await bcrypt.hash(password, 12)
      const res = await new User({
        username,
        email,
        password: hash,
        createdAt: new Date().toISOString()
      }).save()
      const token = generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token
      }
    }
  }
}
