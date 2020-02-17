class GameTurn {
  constructor() {
    this.isUserBePredictor = true;
  }

  switchUserPosition() {
    this.isUserBePredictor = !this.isUserBePredictor;
  }

  isInputFormatCorrect(isPredictor, input) {
    const predictor_length = 3;
    const nonpredictor_length = 2;
    input += "";
    let result = {
      passed: false,
      message: ""
    };

    if ((isPredictor === 0) | (isPredictor === 1)) {
      if (isPredictor) {
        if (input.length !== predictor_length) {
          result.message = `Bad input: now you are the predictor. The input should contains ${predictor_length} characters. in this example format: 'OC2', 'OO4'`;
        } else if (input.match(/[OC][OC][0-4]/g) === null) {
          result.message = `error: predictor should input O or C (all in uppercase) for 2 characters and the number of opened hand prediction between 0-4`;
        } else {
          result.passed = true;
        }
      } else {
        if (input.length !== nonpredictor_length) {
          result.message = `Bad input: Now you are the non-predictor. The input should contains ${nonpredictor_length} characters. in this example format: 'OC', 'OO'.`;
        } else if (input.match(/[OC][OC]/g) === null) {
          result.message = `error: non-predictor should input only O or C (all in uppercase) for 2 characters `;
        } else {
          result.passed = true;
        }
      }
    } else {
      result.message =
        "error: input error. expect only 1 for predictor or 0 for non-predictor";
    }
    return result;
  }
}

module.exports = {
  GameTurn: GameTurn
};
