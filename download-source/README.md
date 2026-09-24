# Download source files

This directory is the canonical source for visitor-facing downloads. The build
copies these files into `public/downloads/` and creates the Word toolkit ZIP, so
there is one editable source location and one stable public URL namespace.

```text
download-source/
├── automation/
│   ├── maps/       AutoHotkey map helper
│   └── word/       Word lecture-note toolkit files
├── guide/          Plain-text setup and safety guide
└── templates/      CSV and TXT fieldwork templates
```

Run `npm run build:downloads` after editing a file. The production build runs the
same command automatically. The generated `public/downloads/` directory is
ignored by Git because it is a release artifact.
