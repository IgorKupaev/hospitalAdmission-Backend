const Admission = require("../models/Admission");

const getAdmissions = async () => {
    return await Admission.find();
}

const createNewAdmission = async (admission) => {
    const newAdmission = new Admission(admission);
    const savedAdmission = await newAdmission.save();
    return savedAdmission;
}

const patchAdmission = async (changes) => {
    return await Admission.findByIdAndUpdate(changes._id, changes);
}

const removeOne = async (_id) => {
    return await Admission.deleteOne({_id});
}

module.exports = {
    getAdmissions,
    createNewAdmission,
    patchAdmission,
    removeOne
}
  