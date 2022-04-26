const jwt = require('jsonwebtoken');

const validateJWT = function (req, res, next) {
  //read token
  const token = req.header('x-token');
  //   console.log(token);
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay  token',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT);
    // console.log(uid);
    req.uid = uid;
    next();
  } catch (err) {
    return res.status(401).json({
      ok: false,
      msg: 'Invalid token',
    });
  }
};
module.exports = {
  validateJWT,
};
