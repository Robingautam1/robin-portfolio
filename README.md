# robin-portfolio

Personal site of **Robin Gautam**, MBA at IIM Rohtak (2025–27): B2B sales, marketing, product and strategy.

Static HTML, CSS and a little vanilla JavaScript. No build step, no framework, no tracking.

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy on Vercel

1. Import this repository in Vercel.
2. Framework preset: **Other**. Leave the build command and output directory empty.
3. Deploy. Every push to `main` redeploys.

## Add the photo

Save a square portrait as `robin.jpg` (at least 256 × 256 px) in the repository root. Until the file exists, the photo slot removes itself.

## What is on the page

- Sticky identity column with a section menu that follows the reader.
- "Hiring for" chips: a recruiter picks Sales, Marketing, Product or Strategy and the most relevant work is highlighted (nothing is hidden).
- Highlights that count up once, project thumbnails drawn from real figures, and a soft light that follows the pointer on desktop.
- All motion uses transform and opacity, stays under a second, and switches off for people who set "reduce motion".

## Credits

- Layout pattern (sticky left column, scrolling evidence on the right) inspired by [Brittany Chiang's portfolio](https://brittanychiang.com).
- Type: [Source Serif 4](https://github.com/adobe-fonts/source-serif) and [Albert Sans](https://github.com/usted/AlbertSans), both SIL Open Font License, self-hosted from Fontsource.
- Built with Claude Code.
