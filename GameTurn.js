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
    return result;
  }

  openHandCounter(inputArray) {
    let totalOpenHand = 0;
    for (let inputIndex = 0; inputIndex < inputArray.length; inputIndex++) {
      let thisInput = inputArray[inputIndex];
      thisInput += "";
      totalOpenHand += (thisInput.match(/O/g) || []).length;
    }
    return totalOpenHand;
  }

  isInputFormatCorrect(input) {
    const predictor_length = 3;
    const nonpredictor_length = 2;

    input += "";
    let result = {
      passed: false,
      message: ""
    };

    if (this.isUserBePredictor) {
      if (
        input.length == nonpredictor_length &&
        input.match(/[OC][OC]/g) !== null
      ) {
        result.message = `Hint: now you are the predictor. Please provide prediction. Please try again in this following format: 'CO3'`;
      } else if (input.length !== predictor_length) {
        result.message = `Hint: now you are the predictor. The input should contains ${predictor_length} characters. in this example format: 'OC2', 'OO4'`;
      } else if (input.match(/[OC][OC][5-9]/g) !== null) {
        result.message = `Hint: You and AI has total 4 hands so the prediction should be in range 0-4`;
      } else if (input.match(/[OC][OC][0-4]/g) === null) {
        result.message = `Hint: predictor should input O or C for 2 characters and the number of opened hand prediction between 0-4`;
      } else {
        result.passed = true;
      }
    } else {
      if (
        input.length === predictor_length &&
        input.match(/[OC][OC][0-4]/g) !== null
      ) {
        result.message = `Hint: now you are the predictor. The prediction is not expected. Please try again in this following format: 'CO'`;
      } else if (input.length !== nonpredictor_length) {
        result.message = `Hint: Now you are the non-predictor. The input should contains ${nonpredictor_length} characters. in this example format: 'OC', 'OO'.`;
      } else if (input.match(/[OC][OC]/g) === null) {
        result.message = `Hint: non-predictor should input only O or C for 2 characters. in this example format: 'OC', 'OO'. `;
      } else {
        result.passed = true;
      }
    }

    return result;
  }
}

module.exports = {
  GameTurn: GameTurn
};
