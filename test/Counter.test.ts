import { increment } from "../src/Counter";

describe("increment()", () => {
	it("should increment the value", () => {
		const value = 3;
		const result = increment(value);

		expect(result).toEqual(value + 1);
	});
});
