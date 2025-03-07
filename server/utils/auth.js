const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  //  authMiddleware logic here 
  const token = req.headers.authorization;
  console.log(token);
  console.log(req.headers);
  if(!token) return res.status(403).json({
    message : "Authorization token not found."
  })
  try{
    const tokenParse = jwt.verify(token, JWT_SECRET);
    req.authorization = tokenParse;
    next();
  }catch(e) {
    res.status(500).json({
      message : "something went wrong!",
    })
    console.log(e);
  }
  };

  module.exports = authMiddleware;