const { getAdmissions, createNewAdmission, patchAdmission, removeOne, removeAll } = require("../services/admission-services");
const Admission = require("../models/Admission");

const allAdmissions = async (req, res) => {
  try {
    const ads = await getAdmissions();
    res.status(200).send(ads);
  } catch (error) {
    res.status(400).send('Error while get admissions');
  }
}

const createAdmission = async (req, res) => {
  try {
    const admission = await createNewAdmission(req.body);
    res.status(200).send(admission);
  } catch (error) {
    res.status(400).send('Error while creating new admission');
  }
}

const editAdmission = async (req, res) => {
  try {
    const isFound = await Admission.findOne({_id: req.body});
    if (!isFound._id) {
      return res.status(404).send('Admission not found');
    }
    patchAdmission(req.body).then((result) => {
      res.status(200).send(result);
    })
  } catch (error) {
    res.status(400).send('Error while editing admission');
  }
}

const removeAdmission = async (req, res) => {
  try {
    removeOne(req.body._id).then(result => {
      res.status(200).send(result);
    })
  } catch (error) {
    res.status(400).send('Error while removing admission');
  }
}

const removeAdmissions = async (req, res) => {
  try {
    removeAll().then(result => {
      res.status(200).send(result);
    })    
  } catch (error) {
    res.status(400).send('Error while removing all admissions');
  }
}

module.exports = {
  allAdmissions,
  createAdmission,
  editAdmission,
  removeAdmission,
  removeAdmissions
}