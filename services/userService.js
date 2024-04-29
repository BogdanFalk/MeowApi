const User = require('../models/User');
const bcrypt = require('bcryptjs');

const register = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found!');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Password is incorrect!');
  }

  return user;
};

const updateUserProfile = async (userId, userData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, userData, { new: true });
    
    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  register,
  login,
  updateUserProfile
};
