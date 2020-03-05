const gameturn = require("../../GameTurn");

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
});
