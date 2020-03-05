const validator = require("../Validator.js");
const constants = require("../constants.js");

const ROLES = constants.ROLES;

describe("Validator", () => {
  let v;

  beforeEach(function() {
    v = new validator.Validator();
  });

  describe("validate format", () => {
    it("should validate predictor input correctly", function() {
      expect(v.isCorrectPredictorFormat("OC3")).toBe(true);
      expect(v.isCorrectPredictorFormat("CC2")).toBe(true);
      expect(v.isCorrectPredictorFormat("CO8")).toBe(false);
      expect(v.isCorrectPredictorFormat("CO")).toBe(false);
      expect(v.isCorrectPredictorFormat("chicken")).toBe(false);
    });

    it("should validate non-predictor input correctly", function() {
      expect(v.isCorrectNonPredictorFormat("OC")).toBe(true);
      expect(v.isCorrectNonPredictorFormat("OO")).toBe(true);
      expect(v.isCorrectNonPredictorFormat("CO8")).toBe(false);
      expect(v.isCorrectNonPredictorFormat("CO3")).toBe(false);
      expect(v.isCorrectNonPredictorFormat("chicken")).toBe(false);
    });
  });

  describe("check length", () => {
    it("should check if the input length is NOT correct predictor length", function() {
      expect(v.isNotCorrectPredictorLength("ccc")).toBe(false);
      expect(v.isNotCorrectPredictorLength("CO3")).toBe(false);
      expect(v.isNotCorrectPredictorLength("CO")).toBe(true);
    });
    it("should check if the input length is NOT correct non-predictor length", function() {
      expect(v.isNotCorrectNonPredictorLength("CO")).toBe(false);
      expect(v.isNotCorrectNonPredictorLength("ll")).toBe(false);
      expect(v.isNotCorrectNonPredictorLength("CO4")).toBe(true);
    });
  });
});
