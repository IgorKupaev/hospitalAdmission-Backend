const { createUser } = require("../services/admission-services");
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken'); 
const { SECRET_KEY } = require('./../../config');

const generateAccesToken = (id) => {
  const payload = {id}
  return jwt.sign(payload, SECRET_KEY, {expiresIn: '24h'})
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

module.exports = {
  regUser,
  login
}