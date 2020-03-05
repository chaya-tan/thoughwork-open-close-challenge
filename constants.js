const REGEX = {
  predictor: /[O|C][O|C][0-4]/g,
  nonPredictor: /[O|C][O|C]/g
};
const inputLength = { predictor: 3, nonPredictor: 2 };
const ROLES = { predictor: "predictor", nonPredictor: "nonPredictor" };

module.exports = {
  REGEX,
  inputLength,
  ROLES
};
