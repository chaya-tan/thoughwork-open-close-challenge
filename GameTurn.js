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

  getPredictionNumber(input, AIanswer) {
    return this.isUserBePredictor
      ? input.match(/[0-4]/g)
      : AIanswer.match(/[0-4]/g);
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

  getCommonErrorMessages(role, input) {
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

  isResultNotPassAndCanNotDetectErrorType(result) {
    return !result.passed && result.message == "";
  }

  getValidationResult(role, input) {
    let result = this.getCommonErrorMessages(role, input);
    if (this.isResultNotPassAndCanNotDetectErrorType(result)) {
      result.message = `Hint: now you are the ${
        this.isUserBePredictor ? "predictor" : "non-predictor"
      }. The input should be in this example format: ${
        this.isUserBePredictor ? `OC2', 'OO4'` : `'OC', 'CC'`
      }`;
    }
    return result;
  }

  isInputFormatCorrect(input) {
    input += "";
    input = input.toUpperCase();
    if (this.isUserBePredictor) {
      return this.getValidationResult(ROLES.predictor, input);
    } else {
      return this.getValidationResult(ROLES.nonPredictor, input);
    }
  }

  reportGameResult() {
    console.log("⭕️ the prediction is correct!");
    console.log(
      this.isUserBePredictor
        ? "\n🎉 🎉 YOU WON!!🎉 🎉\n"
        : "\n☠️ ☠️ YOU LOSE!!☠️ ☠️\n"
    );
  }
}

module.exports = {
  GameTurn: GameTurn
};
