# Research Garden — acceptance verification

Verified locally on 2026-10-02 against the user-approved implementation plan, the supplied CV, and the existing GitHub avatar and README. This is a redesign; no pixel-for-pixel comparison to an original website mockup is claimed.

## Result

Local implementation: passed. This record covers the local review before publication. GitHub Pages deployment uses the workflow described below; its live status is available in the repository’s Actions tab.

## Automated checks

- TypeScript checking and Vite production build passed.
- Seven component interaction tests passed: the short homepage and its CV/email/GitHub destinations; motion preference sharing between homepage and CV; homepage system reduced-motion support; retained CV motion persistence and visible content; CV system reduced-motion precedence; research expansion with planned/completed work distinctions; Pages-relative PDF paths and clipboard API use.
- Reduced-motion precedence was tested with the Motion preference hook mocked to represent a system preference. Native OS settings were not changed.
- Public PDF verification passed: two pages retained, expected academic content present, email link retained, no telephone link or telephone text. The source-derived telephone digits were also checked against extracted text and decompressed PDF objects during creation.
- Both PDF pages were rendered and visually inspected. The original source remains outside the repository.
- `git diff --check` passed.

## Browser verification

Production preview: `http://127.0.0.1:4173/Chen13754/` in the Codex in-app browser.

The root now presents a compact introduction; the original full garden is at `http://127.0.0.1:4173/Chen13754/cv/`. Both HTML entries are present in the production build. Enter on the homepage CV link opened the full page; refreshing the CV URL retained the correct page and metadata; activating the CV header brand returned to the homepage. Motion-off persisted between the two pages. Both pages were checked at the six widths below. The homepage exposes CV directly on mobile without an extra menu.

| CSS viewport width | Content width, excluding scrollbar | Document scroll width |
| --- | --- | --- |
| 320 | 305 | 305 |
| 360 | 345 | 345 |
| 390 | 375 | 375 |
| 768 | 753 | 753 |
| 1280 | 1265 | 1265 |
| 1440 | 1425 | 1425 |

No horizontal overflow in the verified widths. Desktop, tablet, and mobile screenshots were inspected for layout, typography, avatar cropping, image transparency, and spacing.

- Native anchor navigation and active desktop section indicators worked.
- All three research entries opened; expanding a new entry collapsed the previous one.
- Both education coursework sections opened with the correct source content. Enter toggled coursework.
- Mobile navigation opened, closed with Escape, returned focus to the menu button, and closed after selecting a destination.
- The motion toggle stopped decoration loops, retained readable content, and preserved the preference after reload.
- Email and GitHub destinations were checked. Copy-email displayed success; component tests verified the clipboard API was called with the correct address.
- Clicking the CV link produced an actual browser download. Its SHA-256 matched the checked public PDF.
- Computed text contrast was checked on desktop and mobile against the nearest solid background: at least 4.5:1 for normal text and 3:1 for large text. This is a targeted check, not a complete accessibility certification.
- Browser console inspection found no warnings or errors.
- Decorative loops use transforms/opacity and are disabled for reduced motion. No obvious stutter was observed during local interaction; low-end physical devices and other browser engines were not benchmarked.

## Visual refinements made during verification

- Corrected image aspect ratio handling and the decorative orbit at narrow phone widths to remove horizontal overflow.
- Separated decorative captions from the botanical illustration to avoid overlapping text.
- Darkened small text on pink/lavender backgrounds and increased body text to 14px.
- Encoded the illustration as a 304 KB WebP instead of serving the approximately 2 MB PNG. Limited font imports to Latin subsets.
- Matched the saved avatar extension and declared MIME type to the original JPEG content.
- Added a simpler homepage using the existing portrait, palette, botanical assets and animation components, with fewer decorative labels and no research/education sections. Kept the complete garden in the CV entry.
- Increased the mobile homepage portrait container height so floral decoration clears the footer and its motto; preserved a direct, adequately sized motion control.

## Evidence

Local screenshot files are in the ignored `tmp/site-review/` directory:

- `desktop-hero.jpg` and `desktop-full.jpg`
- `mobile-hero.jpg` and `mobile-full.jpg`
- `landing-desktop.jpg` and `landing-mobile.jpg` for the compact homepage.

PDF rendering evidence: `tmp/cv-review/page-1.png` and `page-2.png`.

## Publishing

The workflow runs the tests and production build, uploads `dist`, and deploys to GitHub Pages. It uses the `/Chen13754/` base path. The user accepted the local design and authorized publication on 2026-10-02. Pages uses the GitHub Actions source and deploys reviewed changes pushed to `main`.

Public homepage: `https://chen13754.github.io/Chen13754/`. Full CV page: `https://chen13754.github.io/Chen13754/cv/`.

Live verification on 2026-10-02: GitHub Actions build and deployment succeeded; both public HTML entries and image assets returned HTTP 200. Opening and refreshing the CV page retained its content and metadata. The downloaded public PDF's SHA-256 matched the locally verified public copy. Browser console inspection found no warnings or errors. Horizontal decorative overflow is clipped at the main content boundary.
