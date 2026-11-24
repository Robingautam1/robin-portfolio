# robin-portfolio

Personal site of **Robin Gautam**, MBA candidate at IIM Rohtak (class of 2027), available from March 2027 for roles in B2B sales, marketing and product.

A single static page (HTML, CSS and a little JavaScript). No build step.

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy on Vercel

Import this repository, choose the **Other** framework preset, leave the build settings empty and deploy. Every push to `main` redeploys.

## Files

- `index.html`: the page, with its styles and script inline
- `logo.svg`, `logo-sm.svg`, `favicon.svg`: the robin-and-sun mark traced from the hero illustration; the heavier small version is used on phones, in the contact card and as the favicon
- `robin-illustration.webp`, `og-image.jpg`: the hero illustration and its link-preview copy
- `Robin-Gautam-Resume.pdf`: the résumé behind every résumé link
- `fonts/`: Instrument Serif and DM Sans, SIL Open Font License (see `fonts/OFL.txt`)
