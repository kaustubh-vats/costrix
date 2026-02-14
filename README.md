# Costrix

`costrix` scaffolds a TypeScript + Webpack starter with strict guardrails (lint, typecheck, tests, coverage).

## Usage

```bash
# direct
node ./bin/costrix.js my-app

# with prompts
node ./bin/costrix.js
```

If published, usage is:

```bash
npx costrix my-app
```

## Flags

- `--no-install`: scaffold only, skip `npm install`
- `--no-dev`: scaffold (and optional install), skip auto `npm run dev`
- `-h, --help`: print help

## What It Generates

```text
public/
  favicon.ico
  ogimage.jpg
  index.html
scripts/
  banner.cjs
src/
  index.ts
  App.module.css
  global.d.ts
tests/
  index.test.ts
  styleMock.ts
eslint.config.cjs
jest.config.cjs
tsconfig.json
tsconfig.eslint.json
webpack.config.js
package.json
.gitignore
```

## Generated Project Scripts

- `npm run dev`: webpack dev server
- `npm run test`: jest
- `npm run prod`: lint + typecheck + coverage tests + production build
- `npm run build`: alias to `npm run prod`

## Notes

- Public assets are copied as binary files (no text conversion), so `favicon.ico` and `ogimage.jpg` remain valid.
- Dev/build banners are shown via `scripts/banner.cjs`.
- Starter UI includes a docs button linking to: `https://costrix.kaustubhvats.in`

