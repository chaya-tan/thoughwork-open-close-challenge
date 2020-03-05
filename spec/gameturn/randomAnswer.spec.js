const gameturn = require("../../GameTurn");

describe("GameTurn", function() {
  let turn;

  beforeEach(function() {
    turn = new gameturn.GameTurn();
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
});
