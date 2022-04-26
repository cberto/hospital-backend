// Ruta: /api/users
const { Router } = require('express');

// const { getUser } = require('../controllers/users');
const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getUser);

router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El mail es obligatorio').isEmail(),
    validateFields,
  ],
  createUser
);

router.put(
  '/:id',
  [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El mail es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validateFields,
  ],
  updateUser
);

router.delete('/:id', validateJWT, deleteUser);

module.exports = router;
