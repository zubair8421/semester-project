const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRoomInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";

  if (!validator.isLength(data.name, { min: 5, max: 15 })) {
    errors.name = "Name must be in between 5 and 15 characters";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Name is required!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
