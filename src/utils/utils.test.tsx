import { getRatingsColour } from "./utils";
import { ratingsColours } from "./theme";

describe("testing whether getRatingsColour always returns the correct values", () => {
  it("vote average less than 5 returns red", () => {
    expect(getRatingsColour(1.6)).toBe(ratingsColours.red);
  });
  it("vote average equal to 5 returns yellow", () => {
    expect(getRatingsColour(5)).toBe(ratingsColours.yellow);
  });
  it("vote average equal to 6.9 returns yellow", () => {
    expect(getRatingsColour(6.9)).toBe(ratingsColours.yellow);
  });
  it("vote average equal to 7.1 returns green", () => {
    expect(getRatingsColour(7.1)).toBe(ratingsColours.green);
  });
  it("vote average equal to 10 returns green", () => {
    expect(getRatingsColour(10)).toBe(ratingsColours.green);
  });
  it("vote average equal to 0 returns grey", () => {
    expect(getRatingsColour(0)).toBe(ratingsColours.grey);
  });
});
