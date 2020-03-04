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

  describe("Random AI answer", function() {
    it("should pass predictor validation", function() {
      turn.setUserPositionToPredictor(true);
      const AIans = turn.randomHands();
      turn.setUserPositionToPredictor(false);
      expect(turn.isInputFormatCorrect(AIans).passed).toBe(true);
    });
    it("should pass non-predictor validation", function() {
      turn.setUserPositionToPredictor(false);
      const AIans = turn.randomHands();
      turn.setUserPositionToPredictor(true);
      expect(turn.isInputFormatCorrect(AIans).passed).toBe(true);
    });
  });

  describe("Open hands counter", function() {
    it("should count 'OC' and 'CC3' as 1", function() {
      expect(turn.openHandCounter("OC", "CC3")).toBe(1);
    });
    it("should count 'CC' and 'CC1' as 0", function() {
      expect(turn.openHandCounter("CC", "CC1")).toBe(0);
    });
    it("should count 'OO' and 'CO2' as 3", function() {
      expect(turn.openHandCounter("OO", "CO2")).toBe(3);
    });
  });
});
