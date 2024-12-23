import {
	AllContributorsData,
	inferAllContributors,
} from "all-contributors-inferred";
import * as cp from "node:child_process";
import * as fs from "node:fs/promises";
import { createRequire } from "node:module";
import { PackageJson } from "type-fest";

import { swallowError } from "./swallowError.js";

const require = createRequire(import.meta.dirname);

export async function cli(argv: string[]) {
	const [existingOptions, packageJson = {}, readmeMd = ""] = await Promise.all([
		swallowError(
			async () =>
				JSON.parse(
					(await fs.readFile(".all-contributorsrc")).toString(),
				) as Partial<AllContributorsData>,
		),
		swallowError(
			async () =>
				JSON.parse(
					(await fs.readFile("package.json")).toString(),
				) as PackageJson,
		),
		swallowError(async () => (await fs.readFile("README.md")).toString()),
	]);

	const allContributors = {
		// @ts-expect-error -- type-fest in all-contributors-inferred resolves to 2.x despite package.json resolutions...
		...inferAllContributors({ packageJson, readmeMd }),
		...existingOptions,
	};

	await fs.writeFile(
		".all-contributorsrc",
		JSON.stringify(allContributors, null, 4),
	);

	const exitCode = await new Promise<null | number>((resolve) => {
		const cli = cp.spawn(
			"node",
			[require.resolve("all-contributors-cli/dist/cli.js"), ...argv.slice(2)],
			{ stdio: "inherit" },
		);

		cli.on("close", (code) => {
			resolve(code);
		});
	});

	if (!existingOptions) {
		await fs.rm(".all-contributorsrc");
	}

	return exitCode ?? undefined;
}
