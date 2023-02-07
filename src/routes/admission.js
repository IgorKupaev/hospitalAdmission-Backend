const express = require("express");
const router = express.Router();
const { allAdmissions, createAdmission, editAdmission, removeAdmission} = require('../controllers/admissions-controller');
const { regUser, login } = require('../controllers/users-controller');
const { userValidation } = require('../middlewares/user-validation');
const { admissionValidation } = require('../middlewares/admission-validation');
const auth = require('./../middlewares/auth');

router.get('/admissions', auth, allAdmissions);
router.post('/admission', auth, admissionValidation, createAdmission);
router.patch('/admission', auth, editAdmission);
router.delete('/admission', auth, removeAdmission);
router.post('/registration', userValidation, regUser);
router.post('/login', userValidation, login);

module.exports = router;