# Robin Gautam: portfolio

A static site: `index.html`, `styles.css`, `script.js`, `favicon.svg` and the `fonts` folder. No build step and no packages.

## What's in here

1. **Your CV** is `Robin-Gautam-CV.pdf`, and `cv-preview.jpg` is its picture on the page. To update the CV, replace both files with the same names.
2. **LinkedIn** is already linked (linkedin.com/in/robin-gautam-066ba8233). To change it, search `index.html` for `linkedin.com` (it appears twice).

## Put it online (GitHub, then Vercel)

1. On GitHub, create a new repository (for example `portfolio`). Choose "uploading an existing file", drag in every file and the `fonts` folder, and commit.
2. On Vercel, choose Add New, then Project, and import that repository. Set Framework Preset to "Other", leave the build command empty, and deploy.
3. To use robingautam.in, go to the project's Settings, then Domains, add the domain, and copy the DNS records Vercel shows into your domain registrar.

From then on, every change you commit on GitHub goes live on its own.

## Changing the content

- All the words are in `index.html`. The numbers in the "Pick the role you're filling" switcher sit in the section marked `PROOF, BY ROLE`.
- Colours and sizes are at the top of `styles.css` (`--accent` is the blue).

## Fonts

Imbue and Albert Sans, both under the SIL Open Font License, taken from Fontsource and hosted with the site, so nothing loads from Google.
