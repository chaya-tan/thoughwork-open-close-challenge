const valid = require("./Validator.js");
const constants = require("./constants.js");

const validatatorObj = new valid.Validator();
const ROLES = constants.ROLES;

class GameTurn {
  constructor() {
    this.isUserBePredictor = true;
  }

  switchUserPosition() {
    this.isUserBePredictor = !this.isUserBePredictor;
  }

  setUserPositionToPredictor(isPredictor) {
    this.isUserBePredictor = isPredictor;
  }

  randomHand() {
    const sign = ["O", "C"];
    const randomIndex = Math.floor(Math.random() * sign.length);
    return sign[randomIndex];
  }

  randomHands() {
    let result = this.randomHand() + this.randomHand();
    const totalHands = 4;
    if (!this.isUserBePredictor) {
      const prediction = Math.ceil(Math.random() * totalHands);
      result += prediction;
    }
    7;
    return result;
  }

  openHandCount(inputArray) {
    let totalOpenHand = 0;
    for (let input of inputArray) {
      input += "";
      totalOpenHand += (input.match(/O/g) || []).length;
    }
    return totalOpenHand;
  }

  getValidationResult(role, input) {
    input += "";
    let result = {
      passed: false,
      message: ""
    };
    const errorMessages = {
      predictor: {
        isCorrectNonPredictorFormat: `Hint: now you are the predictor. Please provide prediction. Please try again in this following format: 'CO3'`,
        isNotCorrectPredictorLength: `Hint: now you are the predictor. The input should contains 3 characters. in this example format: 'OC2', 'OO4'`,
        isPredictWrongNumberRange: `Hint: You and AI has total 4 hands so the prediction should be in range 0-4`
      },
      nonPredictor: {
        isCorrectPredictorFormat: `Hint: now you are the non-predictor. The prediction is not expected. Please try again in this following format: 'CO'`,
        isNotCorrectNonPredictorLength: `Hint: Now you are the non-predictor. The input should contains 2 characters. in this example format: 'OC', 'OO'.`
      }
    };
    const validateMethods = Object.keys(errorMessages[role]);

    if (validatatorObj.isCorrectFormat(role, input)) {
      result.passed = true;
      return result;
    }
    for (let method of validateMethods) {
      const isErrorValid = validatatorObj[method](input);
      if (isErrorValid) {
        result.message = errorMessages[role][method];
        break;
      }
    }
    return result;
  }

  isInputFormatCorrect(input) {
    if (this.isUserBePredictor) {
      return this.getValidationResult(ROLES.predictor, input);
    } else {
      return this.getValidationResult(ROLES.nonPredictor, input);
    }
  }
}

const g = new GameTurn();
console.log(g.isInputFormatCorrect("OC"));

module.exports = {
  GameTurn: GameTurn
};
