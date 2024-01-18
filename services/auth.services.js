const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

const { User } = require('../models/User.model')

// set salt rounds

class AuthService {
  constructor() {
    this.secret = "SUPER_SECRET_KEY_123"
    this.saltRounds = 8
  }

  login = async (username, password) => {
    // check if user exists
    const user = await User.findOne({ where: { username: username } })

    if (user) {
      console.log(user.username)

      // compare password
      if (bcrypt.compareSync(password, user.password)) {
        const token = await this.generateToken(user)
        return {
          "message": "User logged in successfully",
          "code": 200,
          "token": token
        }
      } else {
        return {
          "message": "Incorrect login details", 
          "code": 401,
        }
      }
    } else {
      return {
        "message": "User does not exist",
        "code": 404,
      }
    }
  }

  register = async (username, password) => {
    // hash password

    let hash = await bcrypt.hash(password, this.saltRounds)

    // check if user exists
    const user = await User.findOne({ where: { username: username } })

    if (user) {
      return {
        "message": "User already exists",
        "code": 409,
      }
    }
    // create user
    await User.create({ username: username, password: hash })
    // return user
    return {
      "message": "User created successfully",
      "code": 200,
    }

  }

  generateToken = async (user) => {

    const payload = {
      is: user.id,
      username: user.username
    };

    const options = { expiresIn: '1h' };

    const token = await jwt.sign(payload, this.secret, options)

    return token
  }

  verifyToken = (token) => {
    try{
      const decoded = jwt.verify(token, this.secret)
      return {status: true, data: decoded}

    } catch (err) {
      console.log(err)
      return {status: false, error: err}
    }
  }

}

module.exports = AuthService