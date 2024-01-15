const express = require('express')
const { Sequelize } = require('sequelize');
const { UserModel } = require('./Models/UserModel')

// Initializations
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db.sqlite"
})
const app = express()
app.use(express.json())

const User = sequelize.define('User', UserModel);

// variables
const port = 3000

app.get('/', async (req, res) => {
  
  sequelize.sync().then(() => {
    res.send('Tables created successfully');
  }).catch((error) => {
    res.send('Unable to create tables : ' + error);
  });

})

app.post('/auth/register', async (req, res) => {
  let username = req.body.username
  let password = req.body.password

  const user = await User.findOne({ where: { username: username } })

  if(user) {

    res.send('User already exists')

  } else {

    await User.create({ username: username, password: password })
    res.send('User created successfully')

  }
})

app.post('/auth/login', async (req, res) => {
  let username = req.body.username
  let password = req.body.password

  const user = await User.findOne({ where: { username: username } })

  if(user) {

    if(user.password == password) {

      res.send('User logged in successfully')

    } else {

      res.send('Incorrect login details')

    }

  } else {

    res.send('User does not exist')

  }
})

app.post('/auth/logout', (req, res) => {
  res.send('Logout endpoint')
})

app.get('/chat', (req, res) => {
  res.send('Chat endpoint')
})

app.post('/chat/new', (req, res) => {
  res.send('New chat endpoint')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})