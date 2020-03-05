const constants = require("./constants.js");
const REGEX = constants.REGEX;
const inputLength = constants.inputLength;
const ROLES = constants.ROLES;

class Validator {
  constructor() {
    (this.message = ""), (this.passed = false);
  }

  isCorrectLength(role, input) {
    input += "";
    return input.length === inputLength[role];
  }
  isNotCorrectPredictorLength(input) {
    return !this.isCorrectLength(ROLES.predictor, input);
  }
  isNotCorrectNonPredictorLength(input) {
    return !this.isCorrectLength(ROLES.nonPredictor, input);
  }

  isCorrectFormat(role, input) {
    input += "";
    return (
      (input.match(REGEX[role]) || []).length > 0 &&
      this.isCorrectLength(role, input)
    );
  }
  isCorrectPredictorFormat(input) {
    return this.isCorrectFormat(ROLES.predictor, input);
  }
  isCorrectNonPredictorFormat(input) {
    return this.isCorrectFormat(ROLES.nonPredictor, input);
  }

  isPredictWrongNumberRange(input) {
    return (
      (input.match(/[O|C][O|C][5-9]/g) || []).length > 0 &&
      input.length === inputLength[ROLES.predictor]
    );
  }
}

module.exports = {
  Validator: Validator
};
