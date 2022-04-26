const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //email
    const userDB = await User.findOne({ email });
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Email no encontrado',
      });
    }

    //Password

    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Contra no valida',
      });
    }
    //token JWT

    const token = await generateJWT(userDB.id);

    res.json({
      ok: true,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: true,
      msg: 'Error inesperado',
    });
  }
};
module.exports = {
  login,
};
