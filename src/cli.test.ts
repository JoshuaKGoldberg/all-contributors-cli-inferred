import {
	inferAllContributors,
	InferAllContributorsOptions,
} from "all-contributors-inferred";
import { describe, expect, it, vi } from "vitest";

import { cli } from "./cli.js";

const argv = ["add", "JoshuaKGoldberg", "code"];

const mockSpawn = vi.fn().mockReturnValue({
	on: (_event: "close", callback: (code: number) => void) => {
		callback(0);
	},
});

vi.mock("node:child_process", () => ({
	get spawn() {
		return mockSpawn;
	},
}));

let mockFiles!: Record<string, string>;

const mockReadFile = vi.fn((fileName: string) =>
	Promise.resolve(mockFiles[fileName]),
);

const mockRm = vi.fn();

const mockWriteFile = vi.fn();

vi.mock("node:fs/promises", () => ({
	get readFile() {
		return mockReadFile;
	},
	get rm() {
		return mockRm;
	},
	get writeFile() {
		return mockWriteFile;
	},
}));

const mockInferAllContributors = vi.fn(
	(fakeOptions: InferAllContributorsOptions) => ({ fakeOptions }),
);

vi.mock("all-contributors-inferred", () => ({
	get inferAllContributors() {
		return mockInferAllContributors;
	},
}));

describe("cli", () => {
	it("uses empty initial settings when README.md and package.json cannot be read", async () => {
		mockFiles = {};

		await cli(argv);

		expect(mockInferAllContributors.mock.calls).toEqual([
			[{ packageJson: {}, readmeMd: "" }],
		]);
		expect(mockWriteFile).toHaveBeenCalledWith(
			".all-contributorsrc",
			JSON.stringify(
				{ fakeOptions: { packageJson: {}, readmeMd: "" } },
				null,
				4,
			),
		);
	});

	it("uses full initial settings when README.md and package.json can be read and parsed", async () => {
		const readmeMd = "<!-- README -->";
		const packageJson = { name: "repo" };

		mockFiles = {
			"package.json": JSON.stringify(packageJson),
			"README.md": readmeMd,
		};

		await cli(argv);

		expect(mockInferAllContributors.mock.calls).toEqual([
			[{ packageJson, readmeMd }],
		]);
		expect(mockWriteFile).toHaveBeenCalledWith(
			".all-contributorsrc",
			JSON.stringify({ fakeOptions: { packageJson, readmeMd } }, null, 4),
		);
	});

	it("does not delete .all-contributorsrc when it already existed", async () => {
		const existingOptions = { projectOwner: "example-owner" };

		mockFiles = {
			".all-contributorsrc": JSON.stringify(existingOptions),
		};

		await cli(argv);

		expect(mockRm).not.toHaveBeenCalled();
		expect(mockWriteFile).toHaveBeenCalledWith(
			".all-contributorsrc",
			JSON.stringify(
				{ fakeOptions: { packageJson: {}, readmeMd: "" }, ...existingOptions },
				null,
				4,
			),
		);
	});

	it("deletes .all-contributorsrc when it did not already exist", async () => {
		mockFiles = {};

		await cli(argv);

		expect(mockRm).toHaveBeenCalledWith(".all-contributorsrc");
		expect(mockWriteFile).toHaveBeenCalledWith(
			".all-contributorsrc",
			JSON.stringify(
				{ fakeOptions: { packageJson: {}, readmeMd: "" } },
				null,
				4,
			),
		);
	});
});
