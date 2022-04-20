import { decimalRegex } from "./regex.utils";
describe("decimal number", () => {
  it("should match 2.50 is decimal number", () => {
    expect("2.50").toMatch(decimalRegex);
  });

  it("should not match abc is decimal number", () => {
    expect("abc").not.toMatch(decimalRegex);
  });
});
