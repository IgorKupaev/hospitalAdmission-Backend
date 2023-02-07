const { check } = require('express-validator');
const userValidation = [
    check('login', 'User name should have 6 latin letters at least.')
      .isString()
      .trim()
      .notEmpty()
      .isLength({min: 6, max: 20}),
    check('password','Password should have 6 latin letters and 1 number at least.' )
      .isString()
      .trim()
      .notEmpty()
      .isLength({min: 6, max: 20})
];

module.exports = {
  userValidation
};
