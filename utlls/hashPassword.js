const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  bcrypt.hash(password, 10, function (err, hashedPassword) {
    return hashedPassword;
  });
};

module.exports = hashPassword;
