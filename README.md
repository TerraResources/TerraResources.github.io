# TerraResources

A small, static Geography workflow hub for BSc Geography students at the University
of Plymouth. It brings together practical Word/AutoHotkey shortcuts, fieldwork
templates, curated source links, and a Plymouth-aware referencing guide.

## What is included

- **Tools and downloads** — Word lecture-note automation, Numpad launchers, map
  shortcuts, coordinate logs, field-note templates, and setup instructions.
- **Source finder** — searchable links to Plymouth Library resources, academic
  search, UK data, maps/GIS, climate data, and source-evaluation guidance.
- **Referencing guide** — a short workflow for checking the module brief and using
  the University’s current library guidance.
- **Study workflows** — small repeatable processes for writing, note-taking, and
  fieldwork.
- **Privacy and independence** — plain-language information about local-only
  filtering, downloads, third-party links, and the project's relationship to the
  University.

The site is owner-maintained and currently uses static Astro output. It does not
collect accounts, personal schedules, grades, or coursework.

## Local development

Requirements: Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

The development server runs at `http://localhost:4321` by default.

## Useful commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run check` | Run Astro and TypeScript checks |
| `npm run build:downloads` | Generate public download files and the Word ZIP |
| `npm run check:links` | Validate local links in the built `dist/` site |
| `npm run check:content` | Validate headings, language, image alt text, IDs, and external-link safety |
| `npm run build` | Validate and build the production site into `dist/` |
| `npm run preview` | Preview the production build locally |

## Project structure

```text
src/
├── components/       Active Astro UI components
├── data/             Navigation, tool, and source catalogues
├── layouts/          Shared page metadata and layout
├── pages/            Routes, sitemap, and 404 page
└── styles/           Global design system and responsive styles
download-source/
├── automation/       Editable AHK source files
├── guide/            Editable setup/safety guide
└── templates/        Editable CSV/TXT templates
resources/
└── brand/            Brand mark and favicon research/source assets
scripts/              Download builder and production checks
public/
├── downloads/        Generated release copies and ZIP
├── site.webmanifest
├── brand-mark.svg
└── icon assets
```

## Automation files

Editable download sources live in `download-source/`. The `build:downloads` script
copies them into the generated `public/downloads/` release directory, creates
the Word toolkit ZIP, and writes a SHA-256 manifest. Keep the three Word scripts
 together because they share the settings file.

## Add or update a tool

1. Add or edit the source file in `download-source/` when the tool is an AHK script or template.
2. Update its entry in `src/data/tools.ts`.
3. Run `npm run build:downloads` to refresh the release files and archive.
4. Run `npm run build` and test the download locally.

## Add a source

1. Add the source to `src/data/sources.ts`.
2. Choose a category, access label, and a short description of when it is useful.
3. Prefer official or specialist sources and link directly to the service.
4. Check that the link and any access conditions are still accurate.

## Source branding

The source directory prefers each provider’s own favicon and keeps a local copy
for fast, private rendering. When no reliable favicon exists, the card falls back
to initials. The University of Plymouth records are grouped as subpages of one
library site and share a single family mark rather than repeating an icon. The
TerraResources mark itself is custom SVG because it is the site’s own brand asset.

## Referencing note

Plymouth’s current library guide points to Cite Them Right and includes many
Harvard examples, but tells students to check their programme or module guidance.
This site treats that as a starting point, not a guarantee that every Geography
assessment uses Harvard.

## GitHub Pages deployment

`.github/workflows/deploy.yml` validates and deploys the production build whenever
`main` is pushed. In the GitHub repository, open **Settings → Pages** and set the
source to **GitHub Actions**. The production URL is:

`https://terraresources.github.io`

## Content notes

Review file safety, external links, licensing, and attribution requirements before
adding more resources. Keep the site useful and small rather than filling it with
generic educational copy.
