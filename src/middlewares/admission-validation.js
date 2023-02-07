const { check } = require('express-validator');
const admissionValidation = [
    check('pacient', 'Pacient name is empty')
      .isString()
      .trim()
      .notEmpty(),
    check('doctor','Doctor name is empty' )
      .isString()
      .trim()
      .notEmpty(),
    check('date', 'Date of admission is empty')
      .isString()
      .trim()
      .notEmpty(),
    check('complaint', 'Complaint of admission is empty')
      .isString()
      .trim()
      .notEmpty(),
];

module.exports = {
  admissionValidation
};
