const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

const User = require('../../models/User')
const { validateRegisterInput } = require('../../utils/validators')

module.exports = {
  mutations: {
    register: async (_, args, context, info) => {
      /* todo:
      - validate user data
      - make sure user doesn't exist
      */

      const JWT_SECRET = process.env.JWT_SECRET
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
      const token = jwt.sign({
        id: res.id,
        email: res.email,
        username: res.username
      }, JWT_SECRET, { expiresIn: '1h' })

      return {
        ...res._doc,
        id: res._id,
        token
      }
    }
  }
}
