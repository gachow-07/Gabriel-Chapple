# Site design spec

This is the source of truth for the look and feel of the site. `landing-reference.html` in this folder is the approved homepage; match it exactly. Every new page (About, Campus, Projects, Work) should feel like part of the same site.

## Hosting constraints

The site is hosted on **GitHub Pages** as plain static files. Use HTML, CSS, and vanilla JavaScript only: no build step, no frameworks, no npm packages. Use relative links (`about/`, not `/about/`) so the site works both at a custom domain and at `username.github.io/repo-name/`. Each section is a folder with its own `index.html` (for example `projects/index.html`), which gives clean URLs on Pages.

Suggested structure:

```
/index.html            homepage (from landing-reference.html)
/assets/style.css      shared styles (tokens + components below)
/assets/main.js        shared scripts (clock, log toggle)
/about/index.html
/campus/index.html
/projects/index.html
/work/index.html
/resume.pdf
```

## Personality

Minimal, editorial, confident. The page should feel like it was made by someone with taste who can also build. Type does most of the work; there is one accent color, used sparingly. Small details hint at vibe coding (blinking cursor, live clock, the prompt log) without turning the site into a gimmick.

Never use gradients, drop shadows, card grids with shadows, emoji, or stock icons. Never add more than one accent color.

## Colors

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#F4F4F1` | `#0E0E0D` | Page background |
| `--ink` | `#111111` | `#EDEDEA` | Primary text, solid buttons |
| `--muted` | `#62625D` | `#9C9C96` | Secondary text, numbers, meta |
| `--line` | `#D9D9D3` | `#2A2A28` | Hairline borders and dividers |
| `--accent` | `#E5480B` | `#E5480B` | Period after name, cursor, hover states, prompt `>` only |
| `--live` | `#0A7D4F` | `#0A7D4F` | The pulsing status dot only |

Dark mode follows the visitor's system setting via `prefers-color-scheme`. Keep all colors as CSS variables so a future theme toggle can set `data-theme` on `<html>`.

## Typography

Two families from Google Fonts: **Geist** (300, 400, 500, 600) for everything readable and **Geist Mono** (400, 500) for small technical details (site name, status line, row numbers and meta, footer).

| Element | Size | Weight | Tracking | Line height |
|---|---|---|---|---|
| Name (h1) | `clamp(56px, 10vw, 148px)` | 500 | -0.045em | 0.92 |
| Section titles (index rows, page h2) | `clamp(32px, 4vw, 48px)` | 500 | -0.03em | 1.1 |
| Intro paragraph | `clamp(19px, 2vw, 23px)` | 300 | normal | 1.45 |
| Body text | 16px | 400 | normal | 1.5 |
| Nav links | 15px | 400 | normal | — |
| Mono details | 13px (12px for the "Index" label) | 400 | normal | — |

Body text should stay under about 70 characters per line (`max-width: 640px` for paragraphs).

## Layout

Content sits in a centered container, `max-width: 1200px`, with side padding `clamp(20px, 5vw, 64px)`. Everything is left-aligned. Space between major sections is `clamp(72px, 10vw, 120px)`. Rows in lists are separated by 1px `--line` hairlines, not boxes.

## Components

**Top bar.** Sticky at the top, `--bg` background, 1px bottom border. Site name in mono on the left. On the right: About, Campus, Projects, Work, Contact (at 64% opacity, full opacity on hover), then a small solid "Resume" pill with a down arrow that links to `resume.pdf`. Wraps onto two lines on phones. On subpages, the current page's link stays at full opacity and gets `aria-current="page"`.

**Status line.** Above the name in mono, muted: a pulsing green dot with "Open to [Summer 2027] internships" and a live Los Angeles clock (24-hour, updates every second).

**Pills (buttons).** Fully rounded, 44px tall, 20px side padding, 15px weight 500. Solid pill = `--ink` background with `--bg` text (primary action). Outline pill = transparent with 1px `--line` border (secondary). External links get a small diagonal arrow; internal links get a right arrow.

**Index rows.** Each row is a full-width link: mono number, large title, muted description, mono meta with an arrow on the right. On hover or keyboard focus, the title slides right 14px, the number and arrow turn `--accent`, and the arrow rotates from -45° to 0° and nudges right 4px (280ms, `cubic-bezier(.2,.7,.2,1)`). Order: About, Campus, Projects, Work.

**Footer.** Mono, muted. Email, LinkedIn, GitHub links on the left; a "how this was made" outline button on the right that toggles the prompt log. The prompt log is a bordered box (12px radius) listing the prompts used to build the site, each prefixed with an accent `>`. Bottom line: "Designed & vibe-coded by [Your Name]" and a version and last-shipped date.

## Motion

Only three things move on their own: the blinking cursor after the intro, the pulsing status dot, and the clock. Everything else moves only in response to the visitor (hover, focus, clicking the log button). Honor `prefers-reduced-motion` by turning off the blink, pulse, and hover transitions. Do not add scroll-triggered fade-ins.

## Subpages

Subpages reuse the top bar and footer exactly. Each opens with a page title at the section-title size or larger (up to `clamp(48px, 7vw, 96px)`) and a one-line muted intro, then content in the same hairline-row style as the homepage index.

Write entries for Campus, Projects, and Work as **problem, what I did, result**, with a number in the result wherever possible (for example "grew membership 40%"). Projects can each link to a live demo and the GitHub repo.

## Accessibility and quality bar

Every interactive element is a real `<a>` or `<button>` with at least a 44px touch target and a visible focus outline. Text meets 4.5:1 contrast. The layout works at 360px wide with no sideways scrolling. Include a descriptive `<title>` and `<meta name="description">` on every page.

## Placeholders to fill in

Anything in square brackets is a placeholder: `[Your Name]`, `[yourname].com`, `[University]`, `[Summer 2027]`, `[N]` counts, `[you@email.com]`, `[your-handle]`, `[your-username]`, `[date]`. Never invent content to replace them; leave them in place or ask.
