import * as functions from "./functions";

describe("functions tests", () => {
  it("should get flashlight item code for 'Sport Flashlight' input", () => {
    expect(functions.getItemCodeFromItemName("Sport Flashlight")).toEqual(
      "Flashlights"
    );
  });
});
