<h1 align="center">All Contributors CLI Inferred</h1>

<p align="center">Wraps all-contributors-cli by creating the .all-contributorsrc file from inferred settings. 💓</p>

<p align="center">
	<!-- prettier-ignore-start -->
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->
	<a href="https://github.com/JoshuaKGoldberg/all-contributors-cli-inferred/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
	<a href="https://codecov.io/gh/JoshuaKGoldberg/all-contributors-cli-inferred" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/JoshuaKGoldberg/all-contributors-cli-inferred?label=%F0%9F%A7%AA%20coverage" /></a>
	<a href="https://github.com/JoshuaKGoldberg/all-contributors-cli-inferred/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
	<a href="http://npmjs.com/package/all-contributors-cli-inferred"><img alt="📦 npm version" src="https://img.shields.io/npm/v/all-contributors-cli-inferred?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

## Usage

```shell
npx all-contributors-cli-inferred
```

`all-contributors-cli-inferred` supports all the same options as [`all-contributors-cli`](https://allcontributors.org/docs/en/cli/usage).
The only difference is that instead of requiring an `.all-contributorsrc` file, one will be inferred for you by reading from your `README.md` and `package.json`.

For example, to add a contribution your README.md table:

```shell
npx all-contributors-cli-inferred add ghost test
```

You can use this CLI as a drop-in replacement for `all-contributors-cli`.
If you already had an `.all-contributorsrc` file, it won't be deleted.

## How?

This CLI works by:

1. Reading configuration from any existing `.all-contributorsrc`, `package.json`, and `README.md` files
2. Writing a new `.all-contributorsrc` file with that configuration
3. Forwarding all process arguments to `all-contributors-cli`
4. If an `.all-contributorsrc` file didn't already exist, the newly created one is deleted

## Why?

[All Contributors](https://allcontributors.org) is one of many great pieces of tooling available for repositories.
Repositories that use many tools often end up with a dauntingly large number of configuration files -- over a dozen in many cases.

Many users find it exhausting and overwhelming to open a new repository with many config files.
Reducing the number of config files in repositories can help make developing them more approachable.

> 💡 Wish this was built into All Contributors?
> Lend a 👍 to [all-contributors/all-contributors#808 Make the .all-contributorsrc file optional (infer contributors from README.md)](https://github.com/all-contributors/all-contributors/issues/808)!

## Development

See [`.github/CONTRIBUTING.md`](./.github/CONTRIBUTING.md), then [`.github/DEVELOPMENT.md`](./.github/DEVELOPMENT.md).
Thanks! 💖

## Contributors

<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->

<!-- You can remove this notice if you don't want it 🙂 no worries! -->

> 💝 This package was templated with [`create-typescript-app`](https://github.com/JoshuaKGoldberg/create-typescript-app) using the [`create` engine](https://github.com/JoshuaKGoldberg/create).
