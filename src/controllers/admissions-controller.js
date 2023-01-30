const { getAdmissions, createUser, createNewAdmission, patchAdmission, removeOne } = require("../services/admission-services");
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken'); 
const { SECRET_KEY } = require('./../../config');
const Admission = require("../models/Admission");

const generateAccesToken = (id) => {
  const payload = {id}
  return jwt.sign(payload, SECRET_KEY, {expiresIn: '24h'})
}

const allAdmissions = async (req, res) => {
  try {
    const ads = await getAdmissions();
    res.status(200).send(ads);
  } catch (error) {
    res.status(400).send('Error while get admissions');
  }
}

const regUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    const {login, password} = req.body;
    const candidate = await User.findOne({login});

    if (!errors.isEmpty()) {
      return res.status(400).send('Not valid values');
    }
    if (candidate) {
      return res.status(400).send('This user name is already registered');
    }

    const hashPassword = bcrypt.hashSync(password, 7);
    const user = new User({login, password: hashPassword});

    await createUser(user)

    return res.status(200).send("User's registration is succesful");
  } catch (error) {
    res.status(400).send('Error while creating user');
  }
}

const login = async (req, res) => {
  try {
    const {login, password} = req.body;
    const user = await User.findOne({login});
    if (!user) {
      return res.status(404).send(`User with name ${login} not found`);
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).send('Uncorrect password');
    }
    user.password = '';
    const token = generateAccesToken(user._id);
    return res.json({token, user});
    
  } catch (error) {
    res.status(404).send('Error while login');
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
    console.log(isFound)
    if (!isFound) {
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

module.exports = {
  allAdmissions,
  regUser,
  login,
  createAdmission,
  editAdmission,
  removeAdmission
}