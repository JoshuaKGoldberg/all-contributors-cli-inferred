import { describe, expect, it, vi } from "vitest";

import { swallowError } from "./swallowError.js";

describe("swallowError", () => {
	it("returns the result when the action resolves", async () => {
		const data = "abc123";

		const actual = await swallowError(() => Promise.resolve(data));

		expect(actual).toBe(data);
	});
	it("returns the result when the action rejects", async () => {
		const actual = await swallowError(() =>
			Promise.reject(new Error("Oh no!")),
		);

		expect(actual).toBe(undefined);
	});
});
