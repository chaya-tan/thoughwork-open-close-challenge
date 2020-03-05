const gameturn = require("../../GameTurn");

describe("GameTurn", function() {
  let turn;

  beforeEach(function() {
    turn = new gameturn.GameTurn();
  });

  describe("Open hands counter", function() {
    it("should count 'OC' and 'CC3' as 1", function() {
      expect(turn.openHandCount(["OC", "CC3"])).toBe(1);
    });
    it("should count 'CC' and 'CC1' as 0", function() {
      expect(turn.openHandCount(["CC", "CC1"])).toBe(0);
    });
    it("should count 'OO' and 'CO2' as 3", function() {
      expect(turn.openHandCount(["OO", "CO2"])).toBe(3);
    });
  });
});
