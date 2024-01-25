const AuthService = require('../services/auth.services');

class AuthController {
    constructor() {
        this.authService = new AuthService()
    }

    register = async (req, res) => {
        // get username and password from request body
        let { username, password } = req.body
        let response = await this.authService.register(username, password)
        res.send(response)
    }
    login = async (req, res) => {
        // get username and password from request body
        let { username, password } = req.body
        let response = await this.authService.login(username, password)
        res.send(response)
    }

}

module.exports = AuthController