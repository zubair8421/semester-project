const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!validator.isLength(data.name, { min: 2, max: 10 })) {
    errors.name = "Name must be in between 2 and 10 characters";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "Name field can not be empty!";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required!";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid!";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "password field is required!";
  }
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "password must be at least 6 characters!";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "password2 field is required!";
  }

  //   if (!validator.equals(data.password, data.password2)) {
  //     errors.password2 = "Password must match!";
  //   }
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
