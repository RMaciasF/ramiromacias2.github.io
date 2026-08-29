# REDLOG — Blog Homepage

A dark, editorial security-research blog homepage. Static HTML/CSS with a
touch of JS for the nav toggle and topic filter — no framework, no build step.

## What's here

- **Nav** — sticky header with logo, links, subscribe button.
- **Hero article header** — headline, lede, byline, and a recreated
  "product demo" graphic (a static terminal transcript + finding card +
  stats card) — all static, no typing animation, so it reads as a calm
  editorial page rather than a live terminal.
- **One terminal cue at the very top** — a small `kali@kali:~$ cat featured.md`
  line above the headline, plus a matching `exit` line in the footer as a
  bookend. That's the only place the terminal motif appears outside the
  demo graphic — intentionally restrained.
- **Topic filter + article grid** — six sample article cards, filterable by
  the pill row above them (client-side show/hide, no backend).
- **Newsletter strip** and **footer** with link columns.

## Customize

1. **Brand** — replace "REDLOG" throughout `index.html` (nav, footer) and
   the `<title>`/meta description at the top of the file.
2. **Hero article** — edit the headline, lede, byline, and date directly in
   the `.hero` section of `index.html`.
3. **Demo graphic** — the terminal transcript, finding card, and stats card
   are all plain HTML in the `.demo-cluster` block — edit the text/numbers
   directly, no JS involved.
4. **Articles** — each `.article-card` in the `.articles` section is
   self-contained (tag, title, excerpt, date, read time, link). Copy the
   block to add more. Give each one a `data-topic` matching one of the
   filter pills (`ai`, `web`, `redteam`, `cloud`, `tools`) so filtering
   works, or add a new pill in `.topics-inner` for a new category.
5. **Colors** — edit the CSS variables at the top of `style.css`
   (`--bg`, `--green`, `--red`, `--amber`, etc.) to retheme the whole page
   from one place.
6. **Newsletter form** — currently just prevents the default submit
   (`onsubmit="return false;"` in `index.html`). Point it at your real
   email provider's form action, or wire up `script.js` to call an API.

## Preview locally

Open `index.html` directly in a browser — no server required.

## Deploy to GitHub Pages

1. Create a repository named `<your-github-username>.github.io` (or any repo
   with Pages enabled).
2. Push `index.html`, `style.css`, and `script.js` to the repo root.
3. In **Settings → Pages**, set the source to the `main` branch, root folder.
4. Live at `https://<your-github-username>.github.io/` within a few minutes.

Works the same on Netlify, Vercel, or Cloudflare Pages — static files, no
build command needed.
