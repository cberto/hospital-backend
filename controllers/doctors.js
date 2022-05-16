const { response } = require('express');
const Doctors = require('../models/doctors');
const getDoctors = async (req, res = response) => {
  const doctors = await Doctors.find()
    .populate('user', 'name img')
    .populate('hospital', 'name img');

  res.json({
    ok: true,
    // msg: 'getDoctors',
    doctors,
  });
};

const createDoctors = async (req, res = response) => {
  const uid = req.uid;
  const doctors = new Doctors({ user: uid, ...req.body });
  console.log(uid);

  try {
    const doctorsDB = await doctors.save();
    res.json({
      ok: true,
      doctors: doctorsDB,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: 'Error, comunicar',
    });
  }
};

const updateDoctors = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'updateDoctors',
  });
};

const deleteDoctors = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'deleteDoctors',
  });
};

module.exports = {
  getDoctors,
  createDoctors,
  updateDoctors,
  deleteDoctors,
};
