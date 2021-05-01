const path = require('path')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const server = require('./server')

dotenv.config({ path: path.join(__dirname, '.env') })

const port = process.env.PORT || 4000
const {
  DB_HOST: host,
  DB_USER: user,
  DB_PASS: pass
} = process.env

/* eslint-disable
  no-console, promise/always-return, promise/catch-or-return
  ----------
  this is per the apollo-server docs, so temporarily disabling
*/
mongoose.connect(
  `mongodb+srv://${user}:${pass}@${host}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
  .then(() => {
    console.log('🗃️ connected to database')
    return server.listen({ port })
  })
  .then(res => {
    console.log(`🚀 server running @ ${res.url}`)
  })
