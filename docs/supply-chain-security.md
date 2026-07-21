# Supply Chain Security Guide (npm)

This project enforces lockfile-based installs and blocks lifecycle script auto-execution by default.

## 1) Why this protects you

- `ignore-scripts=true` in `.npmrc` blocks automatic `preinstall`, `install`, `postinstall`, and `preuninstall` scripts.
- `npm ci --ignore-scripts` in CI only installs what is pinned in `package-lock.json` and fails if lockfile is missing or out of sync.
- `actions/setup-node` npm-cache uses `package-lock.json` as the cache key input, reducing cache poisoning risk from unpinned dependency graphs.
- Explicit `registry=https://registry.npmjs.org/` and `strict-ssl=true` avoid accidental registry drift.

## 2) Daily local install workflow

Use normal install commands. `.npmrc` already forces script blocking.

```bash
npm install
npm run serve
```

For a fully reproducible local reinstall (recommended before release validation):

```bash
npm ci --ignore-scripts
```

## 3) Handling packages that require postinstall binaries

Some packages need a binary/build step (for example native modules). Keep this explicit and package-scoped:

1. Install/update with scripts blocked.
2. Run only the required command manually, for example:

```bash
npm rebuild <package-name> --foreground-scripts
```

Or run the package's documented binary fetch/build command directly.

Do not globally disable `ignore-scripts` for normal development.

## 4) Safe dependency bump process

Use the dedicated script:

```bash
./scripts/safe-update.sh
# or
./scripts/safe-update.sh <package-name>
```

What it does:

1. Runs `npm audit` first.
2. Updates one package or all allowed versions with `--ignore-scripts`.
3. Regenerates `package-lock.json` and verifies with `npm ci --ignore-scripts`.
4. Prints a `git diff` summary for `package-lock.json` so you can inspect version/integrity changes before commit.

Commit flow:

```bash
git add package-lock.json package.json
git commit -m "chore(deps): safe dependency update"
```

