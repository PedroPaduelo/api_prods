const jwt = require('jsonwebtoken');

async function validate(req, res, next) {
  const { authorization } = req.headers;

  if(!authorization){
    return res.sendStatus(401);
  }

  const [, token] = authorization.split(' ');

  jwt.verify(token, "a", function (err, decoded) {
    if(!err){
      return next();
    }
    return res.sendStatus(401);
  })
}

module.exports = validate;
