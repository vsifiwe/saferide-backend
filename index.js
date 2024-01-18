const express = require('express')
const AuthService = require('./services/auth.services');
const { authenticateToken } = require('./helpers/middleware');
const { Db } = require('./helpers/db');
const { UserModel } = require('./models/User.model');

// Initializations
const app = express()
app.use(express.json())

// variables
const port = 3000

app.get('/', async (req, res) => {

  const sequelize = new Db().getConnection();
  sequelize.define('User', UserModel);

  sequelize.sync().then(() => {
    res.send('Tables created successfully');
  }).catch((error) => {
    res.send('Unable to create tables : ' + error);
  });

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

app.get('/chat', authenticateToken, (req, res) => {
  res.send('Chat endpoint')
})

app.post('/chat/new', (req, res) => {
  res.send('New chat endpoint')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})