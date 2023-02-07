const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const admissionSchema = new Schema({
  pacient: String,
  doctor: String,
  date: String,
  complaint: String
})

module.exports = Admission = mongoose.model("admissions", admissionSchema);