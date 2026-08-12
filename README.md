# David De Santiago — Professional Portfolio

Employer-facing portfolio presenting selected software, infrastructure, web, and hardware-connected work with explicit evidence and honest project boundaries.

## Live site

The portfolio is designed for static hosting through GitHub Pages. The primary experience is the single-page [`index.html`](index.html); earlier CSE 134B exercise pages remain in the repository as coursework history but are not presented as production features.

## Portfolio priorities

- Recruiter-readable introduction and contact paths
- Selected projects with verified outcomes rather than unsupported claims
- Semantic HTML landmarks and heading structure
- Keyboard-visible navigation and skip link
- Responsive layouts from mobile through wide desktop
- Dark and light themes respecting system preference
- Reduced-motion support
- No framework or build dependency

## Run locally

Serve the repository with any static server, then open the printed local URL:

```powershell
npx serve .
```

## Test

```powershell
npm test
```

The integrity checks verify local asset references, professional homepage landmarks, accessible images and controls, external-link safety, and safe custom-element rendering in the archived course exercises.

## Accuracy note

Project descriptions distinguish verified functionality from planned or unvalidated work. Authentication and CRUD pages retained from the original course submission are browser demonstrations, not production security boundaries.
