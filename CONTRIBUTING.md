# Contributing

Contributions are always welcome, no matter how large or small!

We want this community to be friendly and respectful to each other. Please follow it in all your interactions with the project. Before contributing, please read the [code of conduct](./CODE_OF_CONDUCT.md).

## Development workflow

To get started with the project, run `yarn` in the root directory to install the required dependencies for each package:

```sh
yarn
```

Make sure your code passes Prettier and ESLint. Run the following to verify:

```sh
yarn lint
```

To fix formatting errors, run the following:

```sh
yarn lint --fix
```

### Commit message convention

We follow the [conventional commits specification](https://www.conventionalcommits.org/en) for our commit messages:

-   `feat`: new features, e.g. add new method to the module.
-   `fix`: bug fixes, e.g. fix crash due to deprecated method.
-   `docs`: changes into documentation, e.g. add usage example for the module.
-   `style`: changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
-   `refactor`: code refactor, e.g. migrate from class components to hooks.
-   `perf`: improvements to code performance, e.g. optimize an algorithm to speed up processing.
-   `test`: adding or updating tests, e.g. add integration tests using detox.
-   `build`: changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
-   `chore`: tooling changes, e.g. change CI config.
-   `ci`: changes to our CI configuration files and scripts (examples: GitHub Actions, CircleCI).
-   `revert`: reverts a previous commit

Our pre-commit hooks verify that your commit message matches this format when committing.

### Branch names convention

We use the following branche names convention related to conventional commits:

-   `master` is the production branch
-   `feat/<name>` is the name of the feature branch
-   `fix/<name>` is the name of the fix branch
-   `docs/<name>` is the name of the docs branch
-   `style/<name>` is the name of the style branch
-   `refactor/<name>` is the name of the refactor branch
-   `perf/<name>` is the name of the perf branch
-   `test/<name>` is the name of the test branch
-   `build/<name>` is the name of the build branch
-   `chore/<name>` is the name of the chore branch
-   `ci/<name>` is the name of the ci branch
-   `revert/<name>` is the name of the revert branch

### Linting and tests

[ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/)

We use [TypeScript](https://www.typescriptlang.org/) for type checking, [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) for linting and formatting the code, and [Jest](https://jestjs.io/) for testing.

Our pre-commit hooks verify that the linter and tests pass when committing.

### Publishing to npm

We use [release-it](https://github.com/release-it/release-it) to make it easier to publish new versions. It handles common tasks like bumping version based on semver, creating tags and releases etc.

To publish new versions, run the following:

```sh
yarn release
```

### Scripts

The `package.json` file contains various scripts for common tasks:

-   `yarn start`: watch and build the library in development mode.
-   `yarn build`: build the library for production to the `dist` folder.
-   `yarn test`: run unit tests with Jest.
-   `yarn lint`: lint files with ESLint.
-   `yarn release`: release a new version of the library.

### Sending a pull request

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://app.egghead.io/playlists/how-to-contribute-to-an-open-source-project-on-github).

When you're sending a pull request:

-   Prefer small pull requests focused on one change.
-   Verify that linters and tests are passing.
-   Review the documentation to make sure it looks good.
