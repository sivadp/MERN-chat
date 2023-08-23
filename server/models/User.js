const mongoose = require('mongoose');

const User = mongoose.model('account', {
  userName: String,
  password: String,
});

module.exports = User;
