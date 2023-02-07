const { header } = require("express-validator");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");

const tokenValidation = [
  header("authorization")
    .exists()
    .withMessage("No jwt token")
    .isJWT()
    .custom((value) => jwt.verify(value, SECRET_KEY)),
];

module.exports = {
  tokenValidation
};