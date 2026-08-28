## Pricing page

I built the pricing section with three plan cards side by side: Starter, Pro, and Team.

- On a computer screen, the three cards sit in a row next to each other.
- On a phone, there isn't enough room for three cards side by side, so they stack on top of each other instead. This is done with Flexbox, which lets elements automatically rearrange themselves depending on how much space is available.
- The "Pro" plan is highlighted with a blue border and a "Most popular" badge, so it stands out as the recommended option.
- Added a hover effect on the cards — when you move your mouse over one, it scales up slightly and gets a shadow, so it feels a bit more interactive.

## Features page

At first I just copied the same card layout from the Pricing page for Features, but it made the two pages look too similar - like the same page with different words. So I changed it to a different style: each feature (Automated invoicing, Payment reminders, Expense tracking) now has an icon next to a short paragraph, and they alternate — icon on the left for one, icon on the right for the next, and so on down the page.

- Added an icon for each feature using Font Awesome: a dollar/invoice icon, a bell icon, and a chart-line icon, one per card.
- On a phone, there's no room for icon-next-to-text, so each feature stacks into icon-on-top, text-below instead.

## Footer

The footer at the bottom of every page has our logo, links to the other pages, and social media icons - the same footer appears identically on every page of the site. Originally the footer just had a copyright line, so I built it out further by adding the logo, page links, and GitHub/Twitter/LinkedIn icon links.

- On a computer screen, everything sits in one row: logo on the left, links in the middle, icons on the right.
- On a phone, a single row would be too squished, so everything stacks into a centered column instead.
- The footer's links go to the same four pages as the top navigation menu, so no matter where someone clicks, they always have a way to get to every page.

## About page

- There were two sign-up buttons on the page, which felt repetitive, so I removed the extra one.
- Added a timeline section to the page.

## Testing and fixes across the whole site

Once the pages existed, I tested the website by resizing the browser window down to phone-sized (about 375px wide), tablet-sized (about 768px), and a normal desktop size (1200px+), since that's what the assignment asks us to check.

I found and fixed several problems:
1. **The customer quote section** was too narrow on phones — the text looked squeezed into a tiny box. I added a rule so it gets much wider on small screens and the text size shrinks a little to stay readable.
2. **The "Trusted By" company logos** were fighting with the size of their containers on small screens, causing them to look distorted or cramped. I fixed this so each logo is boxed to a fixed size and scales down cleanly without stretching or getting cut off.
3. **Cards overlapping/layering issues** — had to research how to make sure the pricing and feature cards behaved properly and didn't overlap or layer on top of each other at different sizes (mobile, tablet, desktop), since Flexbox can behave unexpectedly when items wrap or shrink.

I also cleaned up the media queries (the rules that say "on screens smaller than X, change the layout like this") so they're all written the same consistent way, which makes it easier for older browsers to understand them too.

## Things I ran into and fixed while working

**Checked every image on the site against the "responsive images" requirement.** I went through all four HTML files and looked at each `<img>`/`<picture>` individually:

- **Hero image** — in `index.html`, inside `<aside class="hero-image-container">`. It originally used `<picture>`/`<source>` tags (the "pick a different image depending on screen size" technique), but both `<source>` lines pointed to the exact same file (`placeholder.png`), while the actual dashboard screenshot (`invoicify_dashboard.png`) was only used in the fallback `<img>` — so the "responsive" part wasn't doing anything real, it was just extra code with no effect. Fixed by resizing the dashboard screenshot into three versions (mobile, tablet, desktop) and pointing each `<source>` at the correct one, so the browser now loads a smaller file on mobile and a larger one on desktop instead of the same placeholder every time.

- **"Trusted By" company logos** — in `index.html`, inside `<div class="info-card-container">`, four `<section class="info-card">` blocks each with an `<img src="public/images/companyN.jpg">`. These had a fixed `width="120"` HTML attribute and no `alt` text.

- **About page illustration** — `about.html`, `<img class="about-img" src="public/images/about-illustration.svg">`. Already had `alt` text and was already sized with plain CSS (`.about-img { width: 55%; }`, overridden to `90%` on mobile in the media query). This one didn't need any technique change — it's a single vector image, so it scales cleanly at any size without needing `<picture>` or `srcset`.

- **Header/footer logo** — appears in every page's `<header>` (`class="logo-img"`) and in `.site-footer` (`class="footer-logo"`). Originally the header logo had generic `alt="Company Logo"` text while the footer used `alt="Invoicify Logo"` — updated both to use the same Invoicify logo and matching alt text for consistency. Sized with fixed `height` in CSS (`.logo-img { height: 72px; }`, `.footer-logo { height: 48px; }`) and `width: auto`, which is the normal way to handle a logo.

**What I actually changed, in the CSS:**
- Added `.info-card-image { width: 110px; height: 90px; display: flex; align-items: center; justify-content: center; overflow: hidden; }` — a fixed-size box for each logo to sit inside.
- Added `.info-card-image img { width: 100%; height: 100%; object-fit: contain; }` — this makes each logo scale to fit inside that box without stretching or getting cropped weirdly, replacing the old fixed `width="120"` attribute on the `<img>` tags in the HTML.
- Added `.info-card-company-name { min-height: 48px; display: flex; align-items: center; justify-content: center; }` — since company names are different lengths (some wrap to two lines, some don't), this keeps all four cards lined up evenly instead of jumping around depending on name length.
- Kept a small extra padding rule on `.info-card-image` for very small phones (under 500px), so the logo box shrinks in a bit more on the smallest screens instead of feeling cramped against the card edges.

**In the HTML**, I removed the `width="120"` attribute from each of the four company logo `<img>` tags in `index.html` and added proper `alt` text (e.g. `alt="Apex Studio logo"`) to each one, since none of them had any before.
