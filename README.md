# AniLet.js

**AniLet.js** is a lightweight, dependency-free JavaScript library to animate letters individually when they appear in the viewport.

## Features
- Animate text letter-by-letter
- Multiple built-in animations: fadeIn, slideUp, slideDown, zoomIn, bounceIn, fallDown, fadeInLeft, fadeInRight, fadeInDown, fadeInTopLeft, fadeInTopRight
- Trigger animations on scroll
- Pure vanilla JS, no dependencies

## Installation
 
### Using npm (for bundlers)
```bash
npm install ani-let
```

Then import the built file (side-effect import initializes the library):
```js
import 'ani-let/dist/aniLet.min.js';
```

### Using a CDN (no build step)
```html
<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/ani-let/dist/aniLet.min.js"></script>
<!-- or unpkg -->
<script src="https://unpkg.com/ani-let/dist/aniLet.min.js"></script>
```

### Using a local file
Copy `dist/aniLet.min.js` into your project and include it:
```html
<script src="/path/to/aniLet.min.js"></script>
```

## Usage
Add `aniLet` and one animation class to any element. Animations trigger when the element enters the viewport.

```html
<script src="aniLet.min.js"></script>

<div class="aniLet aniLet__fadeIn">Hello AniLet</div>
<div class="aniLet aniLet__slideUp">Slide Up</div>
```

Optional timing attributes:
- `data-delay`: delay between letters in ms (default: 50)
- `data-duration`: total animation duration in ms (default: 1000)

```html
<div class="aniLet aniLet__zoomIn" data-delay="80" data-duration="800">Zoom In Example</div>
```

Supported animation classes:
`aniLet__fadeIn`, `aniLet__slideUp`, `aniLet__slideDown`, `aniLet__zoomIn`, `aniLet__fadeInLeft`, `aniLet__fadeInRight`, `aniLet__fadeInDown`, `aniLet__fadeInTopLeft`, `aniLet__fadeInTopRight`, `aniLet__bounceIn`, `aniLet__fallDown`.

## Publish demo to GitHub Pages
If your repository contains a `docs/` folder (recommended), you can host the demo there:
1. Put your demo page at `docs/index.html`.
2. Place the built script at `docs/aniLet.min.js` (copy from `dist/aniLet.min.js`).
3. Push to GitHub.
4. On GitHub: Repository → Settings → Pages → Source: "Deploy from a branch", Branch: `main`, Folder: `/docs` → Save.
5. Your site will be available at `https://<username>.github.io/<repo>/`.

## License
MIT
