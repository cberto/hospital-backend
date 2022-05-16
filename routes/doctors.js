// /api/doctors

const { Router } = require('express');

const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const {
  getDoctors,
  createDoctors,
  updateDoctors,
  deleteDoctors,
} = require('../controllers/doctors');

const router = Router();

router.get('/', getDoctors);

router.post(
  '/',
  [
    validateJWT,
    check('name', 'El nombre del médico es necesario').not().isEmpty(),
    check('hospital', 'El hospital del hospital es necesario').isMongoId(),
    validateFields,
  ],
  createDoctors
);

router.put('/:id', [], updateDoctors);

router.delete('/:id', deleteDoctors);

module.exports = router;
