const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };
    jwt.sign(
      payload,
      process.env.SECRET_JWT,
      {
        expiresIn: '12h',
      },
      (err, token) => {
        if (err) {
          console.error(err);
          reject('No se puede generar el JWT');
        } else {
          resolve(token);
        }
      }
    );
  });
};
module.exports = {
  generateJWT,
};
