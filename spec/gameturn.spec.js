const gameturn = require("../GameTurn.js");

describe("GameTurn", function() {
  let turn;

  beforeEach(function() {
    turn = new gameturn.GameTurn();
  });

  describe("User's Position", function() {
    it("should show whether the user is the predictor", function() {
      expect(turn.isUserBePredictor).toBe(true);
    });

    it("should switch user position", function() {
      turn.switchUserPosition();
      expect(turn.isUserBePredictor).toBe(false);
    });
  });

  describe("Validation", function() {
    it("should not pass if user input random things", function() {
      expect(turn.isInputFormatCorrect(1, "chicken").passed).toBe(false);
      expect(turn.isInputFormatCorrect(1, "prayut").passed).toBe(false);
    });

    it("should pass if users enter the correct format", function() {
      expect(turn.isInputFormatCorrect(1, "OC4").passed).toBe(true);
      expect(turn.isInputFormatCorrect(1, "CO0").passed).toBe(true);
      expect(turn.isInputFormatCorrect(0, "CO").passed).toBe(true);
      expect(turn.isInputFormatCorrect(0, "OO").passed).toBe(true);
      expect(turn.isInputFormatCorrect(0, "OC").passed).toBe(true);
    });

    it("should not pass if the predictor does not specify the number of opened hand", function() {
      expect(turn.isInputFormatCorrect(1, "OC").passed).toBe(false);
      expect(turn.isInputFormatCorrect(1, "CO").passed).toBe(false);
    });

    it("should not pass if the predictor specify number over 4", function() {
      expect(turn.isInputFormatCorrect(1, "CO5").passed).toBe(false);
    });

    it("should not pass if non-predictor specify number", function() {
      expect(turn.isInputFormatCorrect(0, "CO3").passed).toBe(false);
    });
  });
});
