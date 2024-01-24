const express = require('express')
const socket = require('socket.io');
const { join } = require('node:path');

// Services
const AuthService = require('./services/auth.services');
const MessageService = require('./services/message.services');
const { authenticateToken } = require('./helpers/middleware');
const { Db } = require('./helpers/db');
const { UserModel } = require('./models/User.model');

// variables
const port = 3000

// Initializations
const app = express()
app.use(express.json())
const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// const server = require('http').createServer(app);
const io = socket(server);
let messageService = new MessageService()


// app.use(express.static(__dirname));

app.get('/', async (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
  
  // initialize db and tables

  // const sequelize = new Db().getConnection();
  // sequelize.define('User', UserModel);

  // sequelize.sync().then(() => {
  //   res.send('Tables created successfully');
  // }).catch((error) => {
  //   res.send('Unable to create tables : ' + error);
  // });

})

app.post('/auth/register', async (req, res) => {
  // get username and password from request body
  let { username, password } = req.body

  let authService = new AuthService()
  let response = await authService.register(username, password)

  res.send(response)
})

app.post('/auth/login', async (req, res) => {
  let {username, password} = req.body

  let authService = new AuthService()
  let response = await authService.login(username, password)

  res.send(response)
})

app.post('/auth/logout', (req, res) => {
  res.send('Logout endpoint')
})

app.get('/chat', authenticateToken, async (req, res) => {
  const messages = await messageService.getMessages()
  res.send({
    "messages": messages,
    "code": 200,
  })
})

app.post('/chat', authenticateToken, async (req, res) => {
  const message = req.body.message
  const username = req.user.username

  await messageService.addMessage(message, username)
  io.emit('new-message', {message, username})

  res.send({
    "message": "success", 
    "code": 200,
  })
})

app.get('/test', (req, res) => {
  io.emit('test', { message: 'hello' });
  res.send({
    "message": "success", 
    "code": 200,
  })
})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('test', (msg) => {
    console.log("test event received");
  })
  socket.on("disconnect", () => {
    console.log("a user disconnected")
    io.emit("a user disconnected", socket.userId);
  });
});