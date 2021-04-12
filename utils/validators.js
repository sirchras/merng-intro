module.exports = { validateRegisterInput, validateLoginInput }

function validateRegisterInput (username, email, password, confirmPass) {
  const errors = {}

  if (!username.trim()) errors.username = 'Username must not be empty'

  const regex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
  if (!email.trim()) {
    errors.email = 'Email must not be empty'
  } else if (!email.match(regex)) {
    errors.email = 'Email must be a valid email'
  }

  if (!password) {
    errors.password = 'Password must not be empty'
  } else if (password !== confirmPass) {
    errors.confirmPass = 'Passwords must match'
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0
  }
}

function validateLoginInput (username, password) {
  const errors = {}

  if (!username.trim()) errors.username = 'Username must not be empty'

  if (!password) errors.password = 'Password must not be empty'

  return {
    errors,
    valid: Object.keys(errors).length === 0
  }
}
