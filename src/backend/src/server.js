const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const routes = require('./routes')

const PORT_LISTENING = 3333
const DB_USER = 'xonado'
const DB_PASSWD = '12345'

const app = express()

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWD}@cluster0-si0th.mongodb.net/semana09?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)

app.listen(PORT_LISTENING)
