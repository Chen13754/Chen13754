# Research Garden

React + TypeScript + Vite, with Motion for entrance and expand/collapse animations. Assets and fonts are served locally. There are no runtime APIs, analytics, or server dependencies.

## Local development

Requires Node.js 22.12 or newer (Node 22 recommended).

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:5173/Chen13754/`.

```sh
npm run typecheck
npm test
npm run build
npm run preview -- --port 4173
```

The production preview is `http://127.0.0.1:4173/Chen13754/`. The short introduction lives at this root; the full research garden lives at `http://127.0.0.1:4173/Chen13754/cv/`. Vite builds both HTML entry points, so the CV URL works when opened directly or refreshed on GitHub Pages. Both pages use `/Chen13754/` as the base path for assets. npm uses the project-local `.npm-cache`; generated output and dependencies are ignored by Git.

On Windows, if the PowerShell npm wrapper drops command-line options, use `npm.cmd run preview -- --port 4173`, or run `node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4173 --strictPort` directly.

## Updating content

Edit `src/content.ts` for the homepage identity and introduction, research, supervisors, dates, education, honors, and skills. `src/App.tsx` contains both layouts and their shared portrait, decoration, and motion preferences. `src/main.tsx` selects the page using the HTML entry's `data-page` marker. Preserve research status and distinguish planned work from completed contributions.

The original GitHub avatar is saved as `public/images/avatar.jpg` without altering its pixels. The decorative blossom illustration at `public/images/blossoms.webp` was created with the built-in ImageGen tool and encoded to WebP for delivery: an airy cherry-blossom and lavender branch on transparent background, fine ink and watercolor, pastel pink, lavender and muted sage, with a refined Japanese illustration influence and no text. The uncompressed original stays in the ignored local asset directory.

### Illustration prompt

> Create a single decorative botanical illustration asset for an elegant personal research website. Transparent background, generous transparent negative space. A loose, airy asymmetric branch of cherry blossoms and small pale lavender flowers with delicate muted sage leaves, flowing upward from lower left to upper right, several detached tiny petals. Fine hand-drawn ink contours with softly colored watercolor fills, a touch of refined Japanese anime art direction, delicate editorial stationery rather than a children's cartoon. Palette: blush pink #E8BACB, cream white, lavender #CDC0E1, dusty plum line work, muted sage foliage. No typography, no letters, no people, no logos, no border, no drop shadow, no website mockup. Landscape composition, branches and blossoms concentrated in a graceful arc with plenty of room between clusters. The final bitmap is a decorative overlay to accompany a pastel anime avatar in a cream and pink website hero; create only the floral asset, not a website.

## Public CV

Only `public/documents/yuyang-chen-cv.pdf` is public. The original CV is not included in the repository. The public copy removes the telephone text, its icon, and its link, and rebuilds the contact line with the university, email, and region.

To regenerate from a private source outside the repository, install PyMuPDF into a project-local environment and run:

```sh
python scripts/prepare_cv.py /private/path/CVChenYuyang.pdf
python scripts/verify_cv.py public/documents/yuyang-chen-cv.pdf
```

The scripts support the supplied CV layout and stop if the expected contact row is missing. Visually inspect both output pages after regeneration. Never add a private source PDF to Git.

## GitHub Pages

In `Chen13754/Chen13754`, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. The `Deploy research garden to GitHub Pages` workflow builds and deploys on pushes to `main`, or can be started manually.

Site URL: `https://chen13754.github.io/Chen13754/`.

Local preview and publishing are separate. Review the local result before pushing the changes and enabling Pages.

## Motion and accessibility

The header toggle remembers the motion preference in local storage. System reduced-motion always takes precedence. Reduced motion removes decorative animations and entrance/accordion transitions, with all content still usable. Decorative loops pause while the tab is hidden. Touch devices do not use pointer parallax. Mobile navigation supports Escape; native links, buttons, and visible focus outlines support keyboard navigation.
