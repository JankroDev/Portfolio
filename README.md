# Chris Janke · Portfolio

Personal portfolio at https://jankrodev.netlify.app, built with Vite, Vue 3, and TypeScript.

## Develop

    npm install
    npm run dev        # local dev server
    npm run test       # vitest
    npm run build      # type-check + production build to dist/
    npm run preview    # serve dist/

## Content

All copy lives in `src/content/`:

- `profile.ts` – name, title, headline, pitch, links, about paragraphs
- `projects.ts` – the six case studies (drives both the home grid and `/work/:slug`)
- `experience.ts`, `skills.ts` – timeline and skill groups

Screenshots live in `src/assets/projects/`.

## Resume

The resume is authored in `resume/resume.html`. Regenerate the PDF with:

    powershell -File resume/build-pdf.ps1

which writes `public/Chris_Janke_Resume.pdf` using headless Microsoft Edge.

## Deploy

Netlify builds `master` with `npm run build` and publishes `dist/` (see `netlify.toml`).
