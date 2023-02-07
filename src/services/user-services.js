const User = require("../models/User");

const createUser = async (user) => {
  const newUser = new User(user);
  return await newUser.save();
}

module.exports = {
  createUser
}
  