// /api/hospital

const { Router } = require('express');

const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const {
  getHospital,
  createHospital,
  updateHospital,
  deleteHospital,
} = require('../controllers/hospital');

const router = Router();

router.get('/', getHospital);

router.post(
  '/',
  [
    validateJWT,
    check('name', 'El nombre del hospital es necesario').not().isEmpty(),
    validateFields,
  ],
  createHospital
);

router.put('/:id', [], updateHospital);

router.delete('/:id', deleteHospital);

module.exports = router;
