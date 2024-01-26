const express = require('express')
const socket = require('socket.io');
const { join } = require('node:path');

// Services
const { initializeDb } = require('./src/controllers/db.controller');
const authRoutes = require('./src/routes/auth.routes');
const messageRoutes = require('./src/routes/message.routes')

// variables
const PORT  = 3000

// Initializations
const app = express()
app.use(express.json())
app.use(express.static(__dirname + '/public'));

const server = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

const io = socket(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
})

app.get('/init', initializeDb)

app.use('/auth', authRoutes)

app.use('/chat', messageRoutes)

// socket handling
io.on('connection', (socket) => {
  socket.on('user connected', (socketId) => {
    io.emit("user connected", socketId)
  })
  socket.on("user disconnected", (socketId) => {
    io.emit("user disconnected", socketId);
  }); 
  socket.on("new-message", () => {
    io.emit("new-message", '');
  });
});