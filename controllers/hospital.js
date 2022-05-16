const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospital = async (req, res = response) => {
  const hospitales = await Hospital.find().populate('user', 'name');
  res.json({
    ok: true,
    hospitales,
  });
};

const createHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({ user: uid, ...req.body });

  console.log(uid);

  try {
    const hospitalDB = await hospital.save();
    res.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: 'Error, comunicar',
    });
  }
};

const updateHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'updateHospital',
  });
};

const deleteHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'deleteHospital',
  });
};

module.exports = {
  getHospital,
  createHospital,
  updateHospital,
  deleteHospital,
};
