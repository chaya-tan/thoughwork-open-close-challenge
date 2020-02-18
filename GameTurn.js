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

  randomHands() {
    const sign = ["O", "C"];
    let result =
      sign[Math.floor(Math.random() * 2)] + sign[Math.floor(Math.random() * 2)];
    if (!this.isUserBePredictor) {
      console.log("AI is the predictor");
      const prediction = Math.ceil(Math.random() * 4);
      result += prediction;
    }
    return result;
  }

  openHandCounter(input1, input2) {
    input1 += "";
    input2 += "";

    const totalOpenHands1 = input1.match(/O/g);
    const totalOpenHands2 = input2.match(/O/g);
    if (totalOpenHands === null) {
      totalOpenHands = 0;
    } else {
      totalOpenHands = totalOpenHands.length;
    }
    return totalOpenHands;
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

    return result;
  }
}

module.exports = {
  GameTurn: GameTurn
};
