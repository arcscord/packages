import { error, forceSafe, ok } from "../src";

describe("result functions", () => {
  describe("ok function", () => {
    it("should return a ResultOk with the correct value", () => {
      const value = 42;
      const result = ok(value);
      expect(result).toEqual([value, null]);
    });
  });

  describe("error function", () => {
    it("should return a ResultErr with the correct error", () => {
      const err = new Error("Test error");
      const result = error(err);
      expect(result).toEqual([null, err]);
    });
  });

  describe("forceSafe function", () => {
    it("should return ResultOk on successful execution", async () => {
      const fn = async () => 42;
      const result = await forceSafe(fn);
      expect(result).toEqual([42, null]);
    });

    it("should return ResultErr on execution error", async () => {
      const errorMessage = "Test error";
      const fn = async () => {
        throw new Error(errorMessage);
      };
      const result = await forceSafe(fn);
      expect(result).toEqual([null, new Error(errorMessage)]);
    });
  });
});
