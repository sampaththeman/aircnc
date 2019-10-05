const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const socketio = require('socket.io')
const http = require('http')

const routes = require('./routes')

const PORT_LISTENING = 3333
const DB_USER = 'user'
const DB_PASSWD = 'passwd'

const app = express()
const server = http.Server(app)
const io = socketio(server)

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWD}@cluster0-si0th.mongodb.net/semana09?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// save on redis server on production
const connectedUsers = {}

io.on('connection', socket => {
  const { user_id } = socket.handshake.query 
  connectedUsers[user_id] = socket.id
})

app.use((req, res, next) => {
  req.io = io 
  req.connectedUsers = connectedUsers

  return next()
})

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)

server.listen(PORT_LISTENING)
