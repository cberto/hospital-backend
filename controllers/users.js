const { response } = require('express');

const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const getUser = async (req, res) => {
  const users = await User.find({}, 'nombre email role google');
  res.json({
    ok: true,
    users,
    // uid: req.uid,
  });
};

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(404).json({
        ok: false,
        msg: 'Email already exists',
      });
    }

    const user = new User(req.body);

    //password

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
    //token JWT

    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado, consultar los logs',
    });
  }
};

const updateUser = async (req, res = response) => {
  //TODO: validar token y ver si el usuario es correcto
  const uid = req.params.id;

  try {
    const userDB = await User.findById(uid);
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Error, no existe un usuario por ese ID',
      });
    }
    //act
    const { password, google, email, ...fields } = req.body;
    if (userDB.email != email) {
      const existsEmail = await User.findOne({ email });
      if (existsEmail) {
        return res.status(400).json({
          ok: true,
          msg: 'User already exists with that email ',
        });
      }
    }

    // delete fields.password;
    // delete fields.google;
    fields.email = email;
    const userUpdated = await User.findByIdAndUpdate(uid, fields, {
      new: true,
    });

    res.json({
      ok: true,
      user: userUpdated,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    });
  }
};

const deleteUser = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const userDB = await User.findById(uid);
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Error, no existe un usuario por ese id',
      });
    }
    await User.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg: 'User delete',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    });
  }
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
