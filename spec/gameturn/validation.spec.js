const gameturn = require("../../GameTurn");

describe("GameTurn", function() {
  let turn;

  beforeEach(function() {
    turn = new gameturn.GameTurn();
  });

  describe("Validation", function() {
    it("should not pass if user input random things", function() {
      turn.setUserPositionToPredictor(true);
      expect(turn.isInputFormatCorrect("chicken").passed).toBe(false);
      expect(turn.isInputFormatCorrect("prayut").passed).toBe(false);
    });

    it("should pass if predictor user enter the correct format", function() {
      turn.setUserPositionToPredictor(true);
      expect(turn.isInputFormatCorrect("OC4").passed).toBe(true);
      expect(turn.isInputFormatCorrect("CO0").passed).toBe(true);
    });

    it("should pass if non-predictor user enter the correct format", function() {
      turn.setUserPositionToPredictor(false);
      expect(turn.isInputFormatCorrect("CO").passed).toBe(true);
      expect(turn.isInputFormatCorrect("OO").passed).toBe(true);
      expect(turn.isInputFormatCorrect("OC").passed).toBe(true);
    });

    it("should not pass if the predictor does not specify the number of opened hand", function() {
      turn.setUserPositionToPredictor(true);
      expect(turn.isInputFormatCorrect("OC").passed).toBe(false);
      expect(turn.isInputFormatCorrect("CO").passed).toBe(false);
    });

    it("should not pass if the predictor specify number over 4", function() {
      turn.setUserPositionToPredictor(true);
      expect(turn.isInputFormatCorrect("CO5").passed).toBe(false);
    });

    it("should not pass if non-predictor specify number", function() {
      turn.setUserPositionToPredictor(false);
      expect(turn.isInputFormatCorrect("CO3").passed).toBe(false);
    });
  });
});
