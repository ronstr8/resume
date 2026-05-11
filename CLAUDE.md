# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A personal resume repository for Ronald E. Straight. The single source of truth is `resume.json`, stored in [JSON Resume](https://jsonresume.org/) format. HTML and PDF outputs are generated from it and served via GitHub Pages.

## Building

Dependencies must be installed first if `node_modules/` is absent:
```
npm install
```

Generate HTML (must run before PDF):
```
npx resumed render resume.json -o resume.html -t jsonresume-theme-stackoverflow
```

The CI workflow also appends a CSS block to `resume.html` after rendering (for date styling). When building locally for a final output, replicate that:
```bash
echo '<style>.section header .date { float: right; font-weight: 600; color: gray; }</style>' >> resume.html
```

Generate PDF (requires `resume.html` to already exist):
```
./scripts/generate-resume-pdf
```

## CI / Deployment

`.github/workflows/generate-resume.yml` triggers on changes to `resume.json` or the workflow file itself. It:
1. Renders `resume.html` via `npx resumed`
2. Injects date-styling CSS into `resume.html`
3. Generates `resume.pdf` via `scripts/generate-resume-pdf` (Puppeteer headless Chrome)
4. Commits the generated files back to `main`
5. Deploys everything to `gh-pages` branch via `peaceiris/actions-gh-pages`

The rendered resume is publicly accessible at `https://ronstr8.github.io/resume/resume.html` and `.../resume.pdf`.

## Making Changes

Edit only `resume.json`. Committing it triggers CI to regenerate and redeploy the HTML and PDF automatically. The `resume.html` and `resume.pdf` in `main` are CI-generated artifacts — don't edit them by hand.

The `meta.lastUpdated` field in `resume.json` should be updated when making content changes.
