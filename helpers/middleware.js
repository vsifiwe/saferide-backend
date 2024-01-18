const AuthService = require("../services/auth.services");

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.sendStatus(401);
    }

    const authService = new AuthService();
  
    const result = authService.verifyToken(token);
  
    if (!result.success) {
      return res.send({
        "message": "Invalid token" + result.error,
        "code": 401,
      });
    }
  
    req.user = result.data;
    next();
  }

exports.authenticateToken = authenticateToken;