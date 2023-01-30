const Admission = require("../models/Admission");
const User = require("../models/User");

const getAdmissions = async () => {
    return await Admission.find()
}

const createUser = async (user) => {
    const newUser = new User(user);
    return await newUser.save();
}

const createNewAdmission = async (admission) => {
    const newAdmission = new Admission(admission);
    const savedAdmission = await newAdmission.save();
    return savedAdmission;
}

const patchAdmission = async (changes) => {
    return await Admission.findOneAndUpdate({_id: changes.id, ...changes});
}

const removeOne = async (_id) => {
    return await Admission.deleteOne({_id});
}

module.exports = {
    getAdmissions,
    createUser,
    createNewAdmission,
    patchAdmission,
    removeOne
}
  