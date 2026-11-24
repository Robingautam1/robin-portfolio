# robin-portfolio

Personal site of **Robin Gautam**, MBA student at IIM Rohtak (2025–27): B2B sales, partnerships, marketing and product.

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

Save a portrait as `robin.jpg` (about 800 × 960 px) in the repository root. It appears as a polaroid in the Background section. Until the file exists, the slot removes itself.

## What is on the page

- A postcard from Rohtak (the robin is a magpie robin, Haryana's fields behind it). Click it to turn it over and read a note to the hiring team, postmarked with today's date.
- Work shown as the paper it left behind: a sales record, an event ticket, an appointment card, a morning paper, a cost receipt and a phone message pad. All drawn in HTML and CSS, so they stay sharp at any size.
- Notes that open under each piece of work, numbers that count up once, and gentle entrances. Motion switches off for people who set "reduce motion".

## Credits

- Type: [Instrument Serif](https://github.com/Instrument/instrument-serif), [DM Sans](https://github.com/googlefonts/dm-fonts) and [Courier Prime](https://github.com/quoteunquoteapps/CourierPrime), all SIL Open Font License, self-hosted from Fontsource.
- Built with Claude Code.
