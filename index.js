const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.POR || 5000
const dbUrl = 'mongodb+srv://admin:admin000@mern-todo.vuoxe.mongodb.net/mern-todo?retryWrites=true&w=majority'

app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.route'))

async function start() {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true
    })
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  } catch (e) {
    console.error(e)
  }
}

start()