# Portfolio Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 2022 Create React App portfolio with a Vite + Vue 3 + TypeScript site that presents Chris Janke as a Full Stack Developer, with six case-study pages, live StorySoft embeds, and a rewritten downloadable resume.

**Architecture:** A single typed content file (`src/content/projects.ts`) drives both the home-page project grid and the `/work/:slug` case-study route. Components are small single-purpose Vue SFCs styled with plain CSS custom properties. StorySoft's public custom elements are loaded by one wrapper component that falls back to a screenshot on failure. The resume is authored as HTML and printed to PDF by headless Edge.

**Tech Stack:** Vite 8, Vue 3.5, vue-router 5, TypeScript 5.9, vue-tsc 3, Vitest 5, @vue/test-utils 2, jsdom 30, Netlify, Microsoft Edge headless.

**Spec:** `docs/superpowers/specs/2026-09-04-portfolio-rebuild-design.md`

## Global Constraints

- Title used everywhere is **Full Stack Developer**. The string `Jr` must not appear anywhere in `src/`, `resume/`, or `index.html`.
- Stack: Vite + Vue 3 + TypeScript with `<script setup lang="ts">` in every SFC.
- Styling: plain CSS with custom properties. No Bootstrap, no Tailwind, no CSS framework.
- Site is dark only. Ground `#0b1220`, elevated `#121b2e`, text `#e6edf7`, muted `#9aa8bf`, accent `#4da3ff`, accent-soft `#1a2a4a`, border `#1f2c48`.
- Fonts: Fraunces (serif display), Inter (sans body), JetBrains Mono (labels/tags), from Google Fonts with system fallbacks.
- StorySoft copy describes what the tools do, what Chris built, and technologies used. No internal architecture, no source code.
- Embed scripts (exact URLs):
  - `https://public.storysoft.io/static/@storysoft/storysoft-player/latest/storysoftPlayer.es.js`
  - `https://public.storysoft.io/static/@storysoft/storysoft-webframe/latest/storysoftWebframe.es.js`
- Routes: `/` (home), `/work/:slug` (case study), everything else redirects to `/`.
- `npm run build` runs `vue-tsc --noEmit` then `vite build` and must pass before any commit that claims a task complete.
- Work on branch `rebuild/vue-portfolio`. Do not merge to `master`; the user merges.
- Commit messages end with:
  ```
  Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_016aE4wJ5PNigm71ym8cwc8n
  ```
- Before writing the styles in Tasks 2, 6, 7, and 9, load the `frontend-design:frontend-design` skill and apply its guidance so the result does not read as a template. The code in this plan is the baseline; refine spacing, type, and hover treatment, but keep the class names and structure the tests depend on.
- Shell is Git Bash on Windows. Use forward slashes and `cd C:/Users/Cjank/source/repos/Portfolio` where needed. The repo root is `C:/Users/Cjank/source/repos/Portfolio`.

---

## File Structure

| Path | Responsibility |
|---|---|
| `index.html` | Vite entry, meta tags, Google Fonts link |
| `vite.config.ts` | Vue plugin with `storysoft-*` custom element rule, Vitest config |
| `tsconfig.json` | Strict TS for `src/` |
| `netlify.toml` | Build command, publish dir, SPA redirect |
| `package.json` | Scripts and dependencies |
| `src/env.d.ts` | Vite client types (image imports) |
| `src/main.ts` | Create app, install router, mount |
| `src/App.vue` | Header, `<RouterView>`, footer |
| `src/router.ts` | Routes and scroll behavior |
| `src/styles/tokens.css` | Design tokens |
| `src/styles/base.css` | Reset and base typography |
| `src/content/types.ts` | `Project`, `Experience`, `SkillGroup`, `Profile` interfaces |
| `src/content/profile.ts` | Name, title, pitch, links |
| `src/content/experience.ts` | Four timeline entries |
| `src/content/skills.ts` | Four skill groups |
| `src/content/projects.ts` | Six projects + `getProject`, `getAdjacent` |
| `src/assets/projects/*` | Screenshots |
| `src/components/SiteHeader.vue` | Name, nav anchors, icon links |
| `src/components/SiteFooter.vue` | Copyright line, repo link |
| `src/components/HeroSection.vue` | Headline, pitch, two buttons |
| `src/components/StackTags.vue` | Monospace tag list |
| `src/components/ProjectCard.vue` | One card, links to case study |
| `src/components/ProjectGrid.vue` | Grid of all projects |
| `src/components/ExperienceTimeline.vue` | Timeline |
| `src/components/SkillGroups.vue` | Four groups |
| `src/components/AboutSection.vue` | Three paragraphs |
| `src/components/ContactSection.vue` | Links + resume |
| `src/components/StorySoftEmbed.vue` | Loads script, renders element, fallback |
| `src/pages/HomePage.vue` | Assembles home sections |
| `src/pages/CaseStudyPage.vue` | Case study layout, prev/next |
| `src/__tests__/*.test.ts` | Vitest tests |
| `resume/resume.html` | Resume source |
| `resume/build-pdf.ps1` | Edge headless → `public/Chris_Janke_Resume.pdf` |
| `public/Chris_Janke_Resume.pdf` | Generated, committed |
| `public/favicon.svg` | Simple monogram |
| `README.md` | Updated |

---

### Task 1: Scaffold Vite + Vue + TypeScript in place

**Files:**
- Delete: `src/*.jsx`, `src/*.js`, `src/*.css`, `src/data/`, `src/images/icons/`, `src/images/buttonresources/`, `src/images/background/`, `src/images/companylogos/`, `public/index.html`, `public/manifest.json`, `public/logo192.png`, `public/logo512.png`, `public/bookIcon.ico`, `public/favicon.ico`, `package-lock.json`
- Move: `src/images/project-images/*` → `src/assets/projects/` (renamed, see step 2)
- Create: `package.json`, `index.html`, `vite.config.ts`, `tsconfig.json`, `netlify.toml`, `src/env.d.ts`, `src/main.ts`, `src/App.vue`, `src/__tests__/smoke.test.ts`, `public/favicon.svg`
- Modify: `.gitignore`

**Interfaces:**
- Produces: `npm run dev|build|test|preview` scripts; Vitest with jsdom; `storysoft-*` treated as custom elements in both the SFC compiler and runtime.

- [ ] **Step 1: Create the branch and remove Create React App files**

```bash
cd C:/Users/Cjank/source/repos/Portfolio
git checkout -b rebuild/vue-portfolio
git rm -rq src/App.js src/App.css src/index.js src/index.css src/SplashPage.jsx src/AboutMe.jsx src/Projects.jsx src/Languages.jsx src/ContactMe.jsx src/NapaProject.jsx src/ACIProject.jsx src/ACIOEMProject.jsx src/data src/images/icons src/images/buttonresources src/images/background src/images/companylogos public/index.html public/manifest.json public/logo192.png public/logo512.png public/bookIcon.ico public/favicon.ico package-lock.json
rm -rf node_modules
```

- [ ] **Step 2: Move and rename existing screenshots**

```bash
cd C:/Users/Cjank/source/repos/Portfolio
mkdir -p src/assets/projects
git mv "src/images/project-images/Napa Invoices Login.png" src/assets/projects/napa-login.png
git mv "src/images/project-images/Invoices Screen.png"     src/assets/projects/napa-invoices.png
git mv "src/images/project-images/Entry Screen.png"        src/assets/projects/napa-entry.png
git mv "src/images/project-images/Tag Printer 1.PNG"       src/assets/projects/aci-tags-1.png
git mv "src/images/project-images/Tag Printer 2.PNG"       src/assets/projects/aci-tags-2.png
git mv "src/images/project-images/Tag Printer 3.PNG"       src/assets/projects/aci-tags-3.png
rmdir src/images/project-images src/images
cp "C:/Users/Cjank/Downloads/Screenshot 2026-09-04 142339.png" src/assets/projects/story-builder.png
cp "C:/Users/Cjank/Pictures/Screenshots/webframe-embed.png"    src/assets/projects/webframe-gallery.png
cp "C:/Users/Cjank/Pictures/Screenshots/Webframe-open.png"     src/assets/projects/player-open.png
ls src/assets/projects
```

Expected: nine PNG files listed.

- [ ] **Step 3: Write `package.json`**

```json
{
  "name": "portfolio",
  "version": "2.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "vue": "^3.5.42",
    "vue-router": "^5.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^6.0.8",
    "@types/node": "^24.0.0",
    "@vue/test-utils": "^2.5.0",
    "jsdom": "^30.0.1",
    "typescript": "~5.9.0",
    "vite": "^8.2.2",
    "vitest": "^5.0.0",
    "vue-tsc": "^3.3.11"
  }
}
```

- [ ] **Step 4: Write `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Chris Janke, Full Stack Developer. Story editor, embeddable player, and analytics for StorySoft; custom business software for NAPA Auto Parts and ACI Services." />
    <meta name="theme-color" content="#0b1220" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
    <title>Chris Janke · Full Stack Developer</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

- [ ] **Step 5: Write `vite.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

const isCustomElement = (tag: string) => tag.startsWith('storysoft-')

export default defineConfig({
  plugins: [
    vue({
      template: { compilerOptions: { isCustomElement } },
    }),
  ],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts'],
  },
})
```

- [ ] **Step 6: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "jsx": "preserve",
    "types": ["vite/client", "node"]
  },
  "include": ["src/**/*.ts", "src/**/*.vue", "vite.config.ts"]
}
```

- [ ] **Step 7: Write `src/env.d.ts`, `netlify.toml`, `public/favicon.svg`, and update `.gitignore`**

`src/env.d.ts`:
```ts
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}
```

`netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

`public/favicon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#0b1220"/><text x="32" y="43" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="#4da3ff">CJ</text></svg>
```

Append to `.gitignore`:
```
dist/
```

- [ ] **Step 8: Write `src/main.ts` and a placeholder `src/App.vue`**

`src/main.ts`:
```ts
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import './styles/tokens.css'
import './styles/base.css'

const app = createApp(App)
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('storysoft-')
app.use(router)
app.mount('#app')
```

`src/App.vue` (placeholder, replaced in Task 3):
```vue
<script setup lang="ts">
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>
```

`src/router.ts` (placeholder, replaced in Task 3):
```ts
import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: '<h1>Chris Janke</h1>' } }],
})
```

`src/styles/tokens.css` and `src/styles/base.css`: create both as empty files for now (filled in Task 2).

- [ ] **Step 9: Write the smoke test**

`src/__tests__/smoke.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

describe('toolchain', () => {
  it('mounts a Vue component under jsdom', () => {
    const Hello = defineComponent({ render: () => h('p', 'hello') })
    const wrapper = mount(Hello)
    expect(wrapper.text()).toBe('hello')
  })
})
```

- [ ] **Step 10: Install and verify**

```bash
cd C:/Users/Cjank/source/repos/Portfolio
npm install
npm run test
npm run build
```

Expected: `npm run test` reports 1 passed. `npm run build` prints `vite v8...` and `built in` with no TypeScript errors and creates `dist/index.html`.

If `vue-tsc` fails on `vite.config.ts` because of the `vitest/config` import, remove `vite.config.ts` from `tsconfig.json` `include` and rerun.

- [ ] **Step 11: Commit**

```bash
cd C:/Users/Cjank/source/repos/Portfolio
git add -A
git commit -m "Scaffold Vite + Vue 3 + TypeScript, remove Create React App

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_016aE4wJ5PNigm71ym8cwc8n"
```

---

### Task 2: Design tokens and base styles

**Files:**
- Modify: `src/styles/tokens.css`, `src/styles/base.css`

**Interfaces:**
- Produces: CSS custom properties `--bg --bg-elevated --text --text-muted --accent --accent-soft --border --font-display --font-body --font-mono --space-1..--space-8 --radius --radius-lg --content-max --measure`; utility classes `.container`, `.eyebrow`, `.section`, `.section-title`, `.btn`, `.btn-primary`, `.btn-ghost`, `.visually-hidden`.

- [ ] **Step 1: Write `src/styles/tokens.css`**

```css
:root {
  --bg: #0b1220;
  --bg-elevated: #121b2e;
  --text: #e6edf7;
  --text-muted: #9aa8bf;
  --accent: #4da3ff;
  --accent-soft: #1a2a4a;
  --border: #1f2c48;

  --font-display: 'Fraunces', Georgia, 'Times New Roman', serif;
  --font-body: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 5rem;

  --radius: 8px;
  --radius-lg: 14px;
  --content-max: 72rem;
  --measure: 40rem;

  --step--1: 0.875rem;
  --step-0: 1rem;
  --step-1: 1.25rem;
  --step-2: 1.6rem;
  --step-3: clamp(2rem, 1.4rem + 2.5vw, 3rem);
  --step-4: clamp(2.6rem, 1.6rem + 4.5vw, 4.5rem);
}
```

- [ ] **Step 2: Write `src/styles/base.css`**

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  color-scheme: dark;
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    transition: none !important;
    animation: none !important;
  }
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: var(--step-0);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  color: var(--accent);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

h1,
h2,
h3 {
  font-family: var(--font-display);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin: 0;
}

h1 { font-size: var(--step-4); }
h2 { font-size: var(--step-3); }
h3 { font-size: var(--step-2); }

p {
  margin: 0 0 var(--space-4);
  max-width: var(--measure);
}

.container {
  width: min(100% - 2 * var(--space-5), var(--content-max));
  margin-inline: auto;
}

.section {
  padding-block: var(--space-8);
  border-top: 1px solid var(--border);
}

.section-title {
  margin-bottom: var(--space-6);
}

.eyebrow {
  font-family: var(--font-mono);
  font-size: var(--step--1);
  color: var(--accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: var(--space-3);
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius);
  font-weight: 500;
  font-size: var(--step-0);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 150ms ease, border-color 150ms ease, transform 150ms ease;
}

.btn:hover {
  text-decoration: none;
  transform: translateY(-1px);
}

.btn-primary {
  background: var(--accent);
  color: #06101f;
}

.btn-primary:hover {
  background: #74b8ff;
}

.btn-ghost {
  border-color: var(--border);
  color: var(--text);
}

.btn-ghost:hover {
  border-color: var(--accent);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

@media (max-width: 640px) {
  .section {
    padding-block: var(--space-7);
  }
}
```

- [ ] **Step 3: Verify the build still passes and commit**

```bash
cd C:/Users/Cjank/source/repos/Portfolio
npm run build
git add src/styles
git commit -m "Add design tokens and base styles

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_016aE4wJ5PNigm71ym8cwc8n"
```

---

### Task 3: Content types, profile, experience, skills

**Files:**
- Create: `src/content/types.ts`, `src/content/profile.ts`, `src/content/experience.ts`, `src/content/skills.ts`
- Test: `src/__tests__/content.test.ts`

**Interfaces:**
- Produces:
  ```ts
  export interface ProjectLink { label: string; href: string }
  export interface ProjectImage { src: string; alt: string }
  export interface ProjectSection { heading: 'Problem' | 'What I built' | 'Outcome'; paragraphs: string[] }
  export interface ProjectEmbed { kind: 'webframe' | 'player'; attrs: Record<string, string> }
  export interface Project { slug: string; title: string; summary: string; employer: string; role: string; year: string; stack: string[]; thumbnail?: string; images: ProjectImage[]; embed?: ProjectEmbed; sections: ProjectSection[]; links?: ProjectLink[]; nda?: boolean }
  export interface Experience { company: string; role: string; start: string; end: string; location: string; summary: string; compact?: boolean }
  export interface SkillGroup { name: string; items: string[] }
  export interface Profile { name: string; title: string; headline: string; pitch: string; email: string; github: string; linkedin: string; resumeUrl: string; repoUrl: string; about: string[] }
  ```
  and constants `profile: Profile`, `experience: Experience[]`, `skillGroups: SkillGroup[]`.

- [ ] **Step 1: Write the failing test**

`src/__tests__/content.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { profile } from '../content/profile'
import { experience } from '../content/experience'
import { skillGroups } from '../content/skills'

describe('profile', () => {
  it('uses the Full Stack Developer title and never "Jr"', () => {
    expect(profile.title).toBe('Full Stack Developer')
    const all = JSON.stringify(profile)
    expect(all).not.toMatch(/\bJr\b/)
  })

  it('has three about paragraphs', () => {
    expect(profile.about).toHaveLength(3)
  })
})

describe('experience', () => {
  it('lists StorySoft first as current', () => {
    expect(experience[0].company).toBe('StorySoft LLC')
    expect(experience[0].end).toBe('Present')
  })

  it('has exactly one compact entry (Store Manager)', () => {
    const compact = experience.filter((e) => e.compact)
    expect(compact).toHaveLength(1)
    expect(compact[0].role).toBe('Store Manager')
  })
})

describe('skills', () => {
  it('has four groups with between 4 and 8 items each', () => {
    expect(skillGroups).toHaveLength(4)
    for (const g of skillGroups) {
      expect(g.items.length).toBeGreaterThanOrEqual(4)
      expect(g.items.length).toBeLessThanOrEqual(8)
    }
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd C:/Users/Cjank/source/repos/Portfolio && npx vitest run src/__tests__/content.test.ts
```

Expected: FAIL, cannot resolve `../content/profile`.

- [ ] **Step 3: Write `src/content/types.ts`**

```ts
export interface ProjectLink {
  label: string
  href: string
}

export interface ProjectImage {
  src: string
  alt: string
}

export interface ProjectSection {
  heading: 'Problem' | 'What I built' | 'Outcome'
  paragraphs: string[]
}

export interface ProjectEmbed {
  kind: 'webframe' | 'player'
  attrs: Record<string, string>
}

export interface Project {
  slug: string
  title: string
  summary: string
  employer: string
  role: string
  year: string
  stack: string[]
  thumbnail?: string
  images: ProjectImage[]
  embed?: ProjectEmbed
  sections: ProjectSection[]
  links?: ProjectLink[]
  nda?: boolean
}

export interface Experience {
  company: string
  role: string
  start: string
  end: string
  location: string
  summary: string
  compact?: boolean
}

export interface SkillGroup {
  name: string
  items: string[]
}

export interface Profile {
  name: string
  title: string
  headline: string
  pitch: string
  email: string
  github: string
  linkedin: string
  resumeUrl: string
  repoUrl: string
  about: string[]
}
```

- [ ] **Step 4: Write `src/content/profile.ts`**

```ts
import type { Profile } from './types'

export const profile: Profile = {
  name: 'Chris Janke',
  title: 'Full Stack Developer',
  headline: 'Software people use every day.',
  pitch:
    'Full stack developer at StorySoft since 2022, building the story editor, embeddable player, and analytics that healthcare marketing agencies run on. Before that, custom business software for NAPA Auto Parts and ACI Services.',
  email: 'jankrodev@gmail.com',
  github: 'https://github.com/JankroDev',
  linkedin: 'https://www.linkedin.com/in/chris-janke-b58a76231/',
  resumeUrl: '/Chris_Janke_Resume.pdf',
  repoUrl: 'https://github.com/JankroDev/Portfolio',
  about: [
    'I am a self-taught developer based in Cambridge, Ohio. I learned by building, and the projects that taught me the most were the ones a paying customer depended on, where every feature request had to ship.',
    'From 2019 to 2022 I built custom software for businesses in my area: a tag-printing tool and an OEM quoting system for ACI Services, and an invoice portal with an OCR pipeline for a group of NAPA Auto Parts stores. Each of those is still in use.',
    'Since 2022 I have been a full stack developer at StorySoft, working on the Story Builder editor, the embeddable Webframe and Player custom elements, and the analytics that connect them, on a Vue, TypeScript, .NET, and AWS stack.',
  ],
}
```

- [ ] **Step 5: Write `src/content/experience.ts`**

```ts
import type { Experience } from './types'

export const experience: Experience[] = [
  {
    company: 'StorySoft LLC',
    role: 'Full Stack Developer',
    start: 'Apr 2022',
    end: 'Present',
    location: 'Remote',
    summary:
      'Story Builder editor features including the Lottie player component and analytics integration; Webframe and Player custom elements; .NET/C# services on MongoDB and MySQL; AWS CodePipeline and Bitbucket Pipelines; bug-ticket ownership and intern SDK training.',
  },
  {
    company: 'NAPA Auto Parts',
    role: 'Software Engineer',
    start: 'Jan 2022',
    end: 'Feb 2022',
    location: 'Cambridge, OH',
    summary:
      'Customer invoice portal with a Python OCR pipeline, React front end, and Firebase auth and storage.',
  },
  {
    company: 'ACI Services',
    role: 'Software Engineer (Contract)',
    start: 'Jan 2019',
    end: 'Feb 2021',
    location: 'Cambridge, OH',
    summary:
      'Tag printer template tool and an ASP.NET MVC OEM quoting site that cut quote turnaround from days to hours.',
  },
  {
    company: 'NAPA Auto Parts',
    role: 'Store Manager',
    start: 'Apr 2014',
    end: 'Apr 2022',
    location: 'Cambridge, OH',
    summary: 'Ran daily store operations before moving into software full time.',
    compact: true,
  },
]
```

- [ ] **Step 6: Write `src/content/skills.ts`**

```ts
import type { SkillGroup } from './types'

export const skillGroups: SkillGroup[] = [
  {
    name: 'Frontend',
    items: ['Vue 3', 'TypeScript', 'JavaScript', 'React', 'HTML / CSS', 'Web Components', 'Lottie'],
  },
  {
    name: 'Backend',
    items: ['.NET / C#', 'Node.js', 'REST APIs', 'ASP.NET MVC', 'Python'],
  },
  {
    name: 'Data & Cloud',
    items: ['MongoDB', 'MySQL', 'SQL Server', 'Firebase', 'AWS', 'AWS CodePipeline', 'Bitbucket Pipelines'],
  },
  {
    name: 'Practices',
    items: ['Git', 'Agile', 'Unit testing', 'Analytics integration', 'SDK onboarding & intern training', 'MLR-compliant pharma tooling'],
  },
]
```

- [ ] **Step 7: Run the test to verify it passes**

```bash
cd C:/Users/Cjank/source/repos/Portfolio && npx vitest run src/__tests__/content.test.ts
```

Expected: 5 passed.

- [ ] **Step 8: Commit**

```bash
cd C:/Users/Cjank/source/repos/Portfolio
git add src/content src/__tests__/content.test.ts
git commit -m "Add content types, profile, experience, and skills

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_016aE4wJ5PNigm71ym8cwc8n"
```

---

### Task 4: Projects content

**Files:**
- Create: `src/content/projects.ts`
- Test: `src/__tests__/projects.test.ts`

**Interfaces:**
- Consumes: `Project` from `src/content/types.ts`; images in `src/assets/projects/`.
- Produces:
  ```ts
  export const projects: Project[]                 // display order
  export function getProject(slug: string): Project | undefined
  export function getAdjacent(slug: string): { prev: Project; next: Project } | undefined  // cyclic
  ```

- [ ] **Step 1: Write the failing test**

`src/__tests__/projects.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { projects, getProject, getAdjacent } from '../content/projects'

describe('projects', () => {
  it('has six projects in the agreed order', () => {
    expect(projects.map((p) => p.slug)).toEqual([
      'story-builder',
      'webframe',
      'player',
      'napa-invoices',
      'aci-tag-printer',
      'aci-oem-quoting',
    ])
  })

  it('every project has unique slug, summary, three sections, and media or an NDA flag', () => {
    const slugs = new Set(projects.map((p) => p.slug))
    expect(slugs.size).toBe(projects.length)
    for (const p of projects) {
      expect(p.summary.length, p.slug).toBeGreaterThan(20)
      expect(p.sections.map((s) => s.heading), p.slug).toEqual(['Problem', 'What I built', 'Outcome'])
      for (const s of p.sections) expect(s.paragraphs.length, p.slug).toBeGreaterThan(0)
      expect(p.images.length > 0 || p.embed !== undefined || p.nda === true, p.slug).toBe(true)
      expect(p.stack.length, p.slug).toBeGreaterThan(0)
    }
  })

  it('StorySoft embeds use the public custom elements', () => {
    expect(getProject('webframe')?.embed?.kind).toBe('webframe')
    expect(getProject('player')?.embed?.kind).toBe('player')
    expect(getProject('story-builder')?.embed).toBeUndefined()
  })

  it('never says Jr', () => {
    expect(JSON.stringify(projects)).not.toMatch(/\bJr\b/)
  })

  it('getProject returns undefined for unknown slugs', () => {
    expect(getProject('nope')).toBeUndefined()
  })

  it('getAdjacent wraps around', () => {
    expect(getAdjacent('story-builder')?.prev.slug).toBe('aci-oem-quoting')
    expect(getAdjacent('story-builder')?.next.slug).toBe('webframe')
    expect(getAdjacent('aci-oem-quoting')?.next.slug).toBe('story-builder')
    expect(getAdjacent('nope')).toBeUndefined()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd C:/Users/Cjank/source/repos/Portfolio && npx vitest run src/__tests__/projects.test.ts
```

Expected: FAIL, cannot resolve `../content/projects`.

- [ ] **Step 3: Write `src/content/projects.ts`**

```ts
import type { Project } from './types'
import storyBuilder from '../assets/projects/story-builder.png'
import webframeGallery from '../assets/projects/webframe-gallery.png'
import playerOpen from '../assets/projects/player-open.png'
import napaLogin from '../assets/projects/napa-login.png'
import napaInvoices from '../assets/projects/napa-invoices.png'
import napaEntry from '../assets/projects/napa-entry.png'
import aciTags1 from '../assets/projects/aci-tags-1.png'
import aciTags2 from '../assets/projects/aci-tags-2.png'
import aciTags3 from '../assets/projects/aci-tags-3.png'

export const projects: Project[] = [
  {
    slug: 'story-builder',
    title: 'Story Builder',
    summary: 'Drag-and-drop editor agencies use to design responsive pharma ads without a developer.',
    employer: 'StorySoft',
    role: 'Full Stack Developer',
    year: '2022–present',
    stack: ['Vue 3', 'TypeScript', '.NET / C#', 'MongoDB', 'Lottie', 'AWS'],
    thumbnail: storyBuilder,
    images: [{ src: storyBuilder, alt: 'Story Builder editor with the element palette, layers panel, canvas, and typography controls' }],
    sections: [
      {
        heading: 'Problem',
        paragraphs: [
          'Healthcare marketing agencies build interactive Stories for HCPs and patients: multi-page, mobile-first experiences that mix video, audio, animation, images, and surveys. Every one of those Stories used to need a developer in the loop, and every revision from Medical, Legal, and Regulatory review meant another developer round trip.',
          'Agencies needed a way to design and revise Stories themselves, with the compliance pieces pharma requires built in rather than bolted on.',
        ],
      },
      {
        heading: 'What I built',
        paragraphs: [
          'Story Builder is a browser-based editor where a designer drags elements onto a phone-sized canvas: rich text, plain text, images, video, audio, gradients, shapes, and Lottie animations. A layers panel handles ordering and visibility, and a properties panel controls positioning, alignment, rotation, overflow, and typography down to line height. Stories are multi-page with preview, undo and redo, cloud save, and export.',
          'Pharma-specific features live alongside the general tools: an ISI editor for Important Safety Information and a Reference Modal for citations, so compliance content is part of the design flow.',
          'My work on the Builder includes the Lottie player component that renders and previews animations on the canvas, and the analytics integration that lets every Story report engagement back to the platform dashboard. The editor is built in Vue with a .NET/C# backend.',
        ],
      },
      {
        heading: 'Outcome',
        paragraphs: [
          'Agencies design and revise Stories without waiting on engineering, and every Story ships with analytics wired in. The Builder is the front door to the StorySoft platform used by pharma brands and their agencies.',
        ],
      },
    ],
    links: [{ label: 'StorySoft platform', href: 'https://www.storysoft.io/' }],
  },
  {
    slug: 'webframe',
    title: 'Webframe',
    summary: 'Config-driven custom element that turns any client page into a filterable gallery of Stories.',
    employer: 'StorySoft',
    role: 'Full Stack Developer',
    year: '2022–present',
    stack: ['Vue 3', 'TypeScript', 'Web Components', '.NET / C#', 'Google Analytics'],
    thumbnail: webframeGallery,
    images: [{ src: webframeGallery, alt: 'Webframe gallery on storysoft.io showing category filters and five Story cards' }],
    embed: {
      kind: 'webframe',
      attrs: {
        'client-name': 'storysoft',
        'webframe-id': 'examples_page_hcp',
        campaign: 'sitewf',
        'track-visits': '',
        'gtag-integration': 'true',
        'api-url-format': 'https://arc.storysoft.io/webframe/configs/${clientName}/${configName}',
      },
    },
    sections: [
      {
        heading: 'Problem',
        paragraphs: [
          'Brands wanted Stories on their own websites, not just behind links in emails and QR codes. Their web teams run every stack imaginable and would not accept a heavy integration or a build step.',
        ],
      },
      {
        heading: 'What I built',
        paragraphs: [
          'The Webframe is a single custom element. A client adds one script tag and one <storysoft-webframe> tag with their client name and a webframe id, and the element fetches a JSON config for that gallery, renders Story cards with thumbnails and category filters, and opens each Story in the Player when a visitor clicks Start.',
          'It is written in Vue 3 and TypeScript and compiled to a framework-agnostic custom element, so it drops into WordPress, React, or a static page the same way. Visit tracking, campaign attribution, and Google Analytics integration are attributes on the tag, and galleries are managed centrally so a client never touches the embed again after the first paste.',
        ],
      },
      {
        heading: 'Outcome',
        paragraphs: [
          'Clients embed and update Story galleries without engineering help on either side. The live gallery below is the same element running on this page.',
        ],
      },
    ],
    links: [{ label: 'See it on storysoft.io', href: 'https://www.storysoft.io/examples' }],
  },
  {
    slug: 'player',
    title: 'Player',
    summary: 'Embeddable custom element that runs a Story in-frame with analytics, sharing, and compliance UI.',
    employer: 'StorySoft',
    role: 'Full Stack Developer',
    year: '2022–present',
    stack: ['Vue 3', 'TypeScript', 'Web Components', 'Google Analytics'],
    thumbnail: playerOpen,
    images: [{ src: playerOpen, alt: 'Player open over a client page, showing page 1 of 7 of a Story with the prescribing information bar' }],
    embed: {
      kind: 'player',
      attrs: {
        embed: 'true',
        'hide-until-loaded': 'true',
        'preserve-ratio': 'true',
        source: 'https://demos.storysoft.io/nuulife/?campaign=sitewf',
        'gtag-integration': 'true',
        style: 'display:block;width:100%;max-width:375px;margin-inline:auto;',
      },
    },
    sections: [
      {
        heading: 'Problem',
        paragraphs: [
          'A Story has to play identically whether it opens from a QR code on a rep leave-behind, a link in an email, a conference touch screen, or a card in a Webframe on a brand site, and every one of those plays has to be measured.',
        ],
      },
      {
        heading: 'What I built',
        paragraphs: [
          'The Player is the runtime for Stories. As a custom element it loads a Story by source URL, preserves the Story aspect ratio at any size, stays hidden until the Story is ready so pages never flash an empty frame, and can run inline or as a lightbox over the host page.',
          'Inside the frame it provides page navigation with a progress bar, favorite and share actions, and the persistent prescribing-information bar pharma content requires. Analytics events flow to the platform dashboard and optionally to the host page Google Analytics tag.',
        ],
      },
      {
        heading: 'Outcome',
        paragraphs: [
          'One runtime serves every distribution channel StorySoft offers, and every play is tracked. The Story below is a live Player embed of a public demo.',
        ],
      },
    ],
    links: [{ label: 'Public demo Story', href: 'https://demos.storysoft.io/nuulife/?campaign=sitewf' }],
  },
  {
    slug: 'napa-invoices',
    title: 'NAPA Invoices',
    summary: 'Invoice portal with a Python OCR pipeline so a store could give its largest customer self-serve access to invoices.',
    employer: 'NAPA Auto Parts',
    role: 'Software Engineer',
    year: '2022',
    stack: ['React', 'Firebase', 'Python', 'Tesseract OCR', 'Bootstrap'],
    thumbnail: napaInvoices,
    images: [
      { src: napaLogin, alt: 'NAPA Invoices login screen' },
      { src: napaInvoices, alt: 'Invoice list with search, sort, and filter' },
      { src: napaEntry, alt: 'Upload screen where the manager selects scanned invoices and checks them before upload' },
    ],
    sections: [
      {
        heading: 'Problem',
        paragraphs: [
          'NAPA stores run on TAMS II, which has no electronic invoicing: no downloads, no exports. When a large commercial account asked for its invoices, a manager printed, scanned, and emailed each one, and the customer still had to dig through a pile to find the one they needed. One large account left over it.',
          'The owner wanted a site where that customer could sort, filter, search, and view every invoice from the week, without the manager hand-keying twenty to sixty fields per invoice.',
        ],
      },
      {
        heading: 'What I built',
        paragraphs: [
          'A Python script using pytesseract and pyimage reads a folder of scanned invoices, pulls the invoice number, date, and total from fixed bounding boxes, and renames each file to invoice_date_total so it is ready to upload.',
          'A React site with Firebase Authentication gives the store an upload screen where the manager selects the prepared files, error-checks them, and uploads. Each upload creates a Firestore document with the invoice metadata and download URL. The customer logs in, sees a quick view of number, date, and total, and opens any invoice in the browser.',
        ],
      },
      {
        heading: 'Outcome',
        paragraphs: [
          'End-of-week invoicing for the account became scan, double-click, upload. The customer got searchable access to their invoices, and the store kept the account.',
        ],
      },
    ],
    links: [
      { label: 'Site repo', href: 'https://github.com/JankroDev/NapaInvoices/tree/master/NapaInvoices' },
      { label: 'OCR script repo', href: 'https://github.com/JankroDev/PythonSriptInvoiceInfo' },
      { label: 'Live site', href: 'https://eliteinvoices.netlify.app' },
    ],
  },
  {
    slug: 'aci-tag-printer',
    title: 'ACI Tag Printer',
    summary: 'Web tool that lets shop techs lay out and save laser-etched compressor tags themselves.',
    employer: 'ACI Services',
    role: 'Software Engineer (Contract)',
    year: '2019–2021',
    stack: ['JavaScript', 'jQuery', 'Java', 'SQL', 'HTML / CSS'],
    thumbnail: aciTags2,
    images: [
      { src: aciTags1, alt: 'Tag Printer: selecting a tag template' },
      { src: aciTags2, alt: 'Tag Printer: dragging text boxes over the tag image' },
      { src: aciTags3, alt: 'Tag Printer: saving print order and notes to the database' },
    ],
    sections: [
      {
        heading: 'Problem',
        paragraphs: [
          'ACI Services labels finished compressors with a laser etcher. Every new tag layout went through a designer: the tech explained the tag, the designer built it, inserted it into the database, and re-did the whole thing for any change. The designer lost hours a week to interruptions and the techs waited on every revision.',
        ],
      },
      {
        heading: 'What I built',
        paragraphs: [
          'A browser tool where a tech uploads the tag image, drags text boxes onto it, sets the print order and quantity, adds notes, and saves the configuration straight to the label database. Existing tags can be reopened and edited the same way.',
          'The front end is jQuery and vanilla JavaScript with a third-party measurement and text-box library; Java handles the SQL queries against the existing label database.',
        ],
      },
      {
        heading: 'Outcome',
        paragraphs: [
          'Techs who described themselves as not tech-savvy create and revise their own tags. The designer is out of the loop, and new labels go from request to database in minutes.',
        ],
      },
    ],
    links: [{ label: 'ACI Services', href: 'https://aciservices.com/' }],
  },
  {
    slug: 'aci-oem-quoting',
    title: 'ACI OEM Quoting',
    summary: 'ASP.NET MVC site that gave the whole sales team one source of truth for cost and margin.',
    employer: 'ACI Services',
    role: 'Software Engineer (Contract)',
    year: '2019–2021',
    stack: ['C#', 'ASP.NET MVC', 'SQL Server', 'jQuery', 'HTML / CSS'],
    images: [],
    nda: true,
    sections: [
      {
        heading: 'Problem',
        paragraphs: [
          'The sales team quoted from a scattering of Excel files with stale costs. Only a couple of people knew the files well enough to use them, so quotes took days and margins swung from salesperson to salesperson. The owner wanted consistent quotes, faster.',
        ],
      },
      {
        heading: 'What I built',
        paragraphs: [
          'An internal ASP.NET MVC site that pulls part costs, assembly data, last-sale prices, and margin targets from several databases into one searchable view. A salesperson searches by part number, assembly number, or order and gets the complete picture for the quote in front of them.',
          'Details are limited by a non-disclosure agreement, so there are no screenshots for this one.',
        ],
      },
      {
        heading: 'Outcome',
        paragraphs: [
          'Everyone on the sales team quotes from the same numbers. Average quote time dropped from a couple of days to a couple of hours.',
        ],
      },
    ],
    links: [{ label: 'ACI Services', href: 'https://aciservices.com/' }],
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacent(slug: string): { prev: Project; next: Project } | undefined {
  const i = projects.findIndex((p) => p.slug === slug)
  if (i === -1) return undefined
  const prev = projects[(i - 1 + projects.length) % projects.length]!
  const next = projects[(i + 1) % projects.length]!
  return { prev, next }
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
cd C:/Users/Cjank/source/repos/Portfolio && npx vitest run src/__tests__/projects.test.ts
```

Expected: 6 passed. If Vitest cannot import `.png`, confirm `src/env.d.ts` exists (Task 1) and that the test runs through `vite.config.ts` (it must, because `vitest/config` is used there).

- [ ] **Step 5: Commit**

```bash
cd C:/Users/Cjank/source/repos/Portfolio
git add src/content/projects.ts src/__tests__/projects.test.ts src/assets
git commit -m "Add six project case studies as typed content

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_016aE4wJ5PNigm71ym8cwc8n"
```

---

### Task 5: Router, App shell, header, footer

**Files:**
- Modify: `src/router.ts`, `src/App.vue`
- Create: `src/components/SiteHeader.vue`, `src/components/SiteFooter.vue`, `src/pages/HomePage.vue` (placeholder), `src/pages/CaseStudyPage.vue` (placeholder)
- Test: `src/__tests__/router.test.ts`

**Interfaces:**
- Consumes: `profile` from `src/content/profile.ts`.
- Produces: `router` (default history) and `createAppRouter(history)` for tests; route names `home` and `case-study`.

- [ ] **Step 1: Write the failing test**

`src/__tests__/router.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { createMemoryHistory } from 'vue-router'
import { createAppRouter } from '../router'

describe('router', () => {
  it('serves home and case-study routes', async () => {
    const router = createAppRouter(createMemoryHistory())
    await router.push('/')
    expect(router.currentRoute.value.name).toBe('home')
    await router.push('/work/story-builder')
    expect(router.currentRoute.value.name).toBe('case-study')
    expect(router.currentRoute.value.params.slug).toBe('story-builder')
  })

  it('redirects unknown paths to home', async () => {
    const router = createAppRouter(createMemoryHistory())
    await router.push('/nothing/here')
    expect(router.currentRoute.value.path).toBe('/')
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd C:/Users/Cjank/source/repos/Portfolio && npx vitest run src/__tests__/router.test.ts
```

Expected: FAIL, `createAppRouter` is not exported.

- [ ] **Step 3: Write `src/router.ts`**

```ts
import { createRouter, createWebHistory, type RouterHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import CaseStudyPage from './pages/CaseStudyPage.vue'

export function createAppRouter(history: RouterHistory) {
  return createRouter({
    history,
    routes: [
      { path: '/', name: 'home', component: HomePage },
      { path: '/work/:slug', name: 'case-study', component: CaseStudyPage, props: true },
      { path: '/:pathMatch(.*)*', redirect: '/' },
    ],
    scrollBehavior(to, _from, savedPosition) {
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash, top: 80 }
      return { top: 0 }
    },
  })
}

export const router = createAppRouter(createWebHistory())
```

- [ ] **Step 4: Write placeholder pages**

`src/pages/HomePage.vue`:
```vue
<script setup lang="ts">
import { profile } from '../content/profile'
</script>

<template>
  <div class="container">
    <h1>{{ profile.headline }}</h1>
  </div>
</template>
```

`src/pages/CaseStudyPage.vue`:
```vue
<script setup lang="ts">
defineProps<{ slug: string }>()
</script>

<template>
  <div class="container">
    <h1>{{ slug }}</h1>
  </div>
</template>
```

- [ ] **Step 5: Write `src/components/SiteHeader.vue`**

```vue
<script setup lang="ts">
import { profile } from '../content/profile'

const nav = [
  { label: 'Work', hash: '#work' },
  { label: 'Experience', hash: '#experience' },
  { label: 'About', hash: '#about' },
  { label: 'Contact', hash: '#contact' },
]
</script>

<template>
  <header class="header">
    <div class="container header__inner">
      <RouterLink to="/" class="header__name">{{ profile.name }}</RouterLink>
      <nav class="header__nav" aria-label="Primary">
        <RouterLink v-for="item in nav" :key="item.hash" :to="{ path: '/', hash: item.hash }">
          {{ item.label }}
        </RouterLink>
      </nav>
      <div class="header__links">
        <a :href="`mailto:${profile.email}`" aria-label="Email">Email</a>
        <a :href="profile.github" target="_blank" rel="noreferrer" aria-label="GitHub">GitHub</a>
        <a :href="profile.linkedin" target="_blank" rel="noreferrer" aria-label="LinkedIn">LinkedIn</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}

.header__inner {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  padding-block: var(--space-4);
}

.header__name {
  font-family: var(--font-display);
  font-size: var(--step-1);
  color: var(--text);
}

.header__name:hover {
  text-decoration: none;
  color: var(--accent);
}

.header__nav {
  display: flex;
  gap: var(--space-4);
  margin-left: auto;
}

.header__nav a,
.header__links a {
  font-family: var(--font-mono);
  font-size: var(--step--1);
  color: var(--text-muted);
}

.header__nav a:hover,
.header__links a:hover {
  color: var(--text);
  text-decoration: none;
}

.header__links {
  display: flex;
  gap: var(--space-3);
  padding-left: var(--space-4);
  border-left: 1px solid var(--border);
}

@media (max-width: 640px) {
  .header__nav {
    display: none;
  }
  .header__links {
    margin-left: auto;
  }
}
</style>
```

- [ ] **Step 6: Write `src/components/SiteFooter.vue`**

```vue
<script setup lang="ts">
import { profile } from '../content/profile'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <span>© {{ year }} {{ profile.name }}</span>
      <span>
        Built with Vue 3, TypeScript, and Vite.
        <a :href="profile.repoUrl" target="_blank" rel="noreferrer">Source</a>
      </span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  padding-block: var(--space-6);
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--step--1);
}

.footer__inner {
  display: flex;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
}
</style>
```

- [ ] **Step 7: Write `src/App.vue`**

```vue
<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <SiteHeader />
  <main>
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <SiteFooter />
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 180ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```

- [ ] **Step 8: Run tests and build**

```bash
cd C:/Users/Cjank/source/repos/Portfolio && npm run test && npm run build
```

Expected: all tests pass (smoke, content, projects, router), build succeeds.

- [ ] **Step 9: Commit**

```bash
cd C:/Users/Cjank/source/repos/Portfolio
git add src/router.ts src/App.vue src/components/SiteHeader.vue src/components/SiteFooter.vue src/pages src/__tests__/router.test.ts
git commit -m "Add router, app shell, header, and footer

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_016aE4wJ5PNigm71ym8cwc8n"
```

---

### Task 6: Hero, StackTags, ProjectCard, ProjectGrid

**Files:**
- Create: `src/components/HeroSection.vue`, `src/components/StackTags.vue`, `src/components/ProjectCard.vue`, `src/components/ProjectGrid.vue`
- Test: `src/__tests__/ProjectGrid.test.ts`

**Interfaces:**
- Consumes: `projects`, `profile`, `Project` type.
- Produces: `StackTags` props `{ items: string[]; max?: number }`; `ProjectCard` props `{ project: Project }`; `ProjectGrid` renders one `ProjectCard` per project inside `<section id="work">`.

- [ ] **Step 1: Write the failing test**

`src/__tests__/ProjectGrid.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory } from 'vue-router'
import { createAppRouter } from '../router'
import ProjectGrid from '../components/ProjectGrid.vue'
import { projects } from '../content/projects'

async function mountGrid() {
  const router = createAppRouter(createMemoryHistory())
  await router.push('/')
  await router.isReady()
  return mount(ProjectGrid, { global: { plugins: [router] } })
}

describe('ProjectGrid', () => {
  it('renders one card per project linking to its case study', async () => {
    const wrapper = await mountGrid()
    const links = wrapper.findAll('a.card')
    expect(links).toHaveLength(projects.length)
    projects.forEach((p, i) => {
      expect(links[i]!.attributes('href')).toBe(`/work/${p.slug}`)
      expect(links[i]!.text()).toContain(p.title)
    })
  })

  it('shows at most four stack tags per card', async () => {
    const wrapper = await mountGrid()
    for (const card of wrapper.findAll('a.card')) {
      expect(card.findAll('.tag').length).toBeLessThanOrEqual(4)
    }
  })

  it('renders a typographic placeholder when a project has no thumbnail', async () => {
    const wrapper = await mountGrid()
    const oem = wrapper.find('a[href="/work/aci-oem-quoting"]')
    expect(oem.find('img').exists()).toBe(false)
    expect(oem.find('.card__placeholder').exists()).toBe(true)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd C:/Users/Cjank/source/repos/Portfolio && npx vitest run src/__tests__/ProjectGrid.test.ts
```

Expected: FAIL, cannot resolve `ProjectGrid.vue`.

- [ ] **Step 3: Write `src/components/StackTags.vue`**

```vue
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ items: string[]; max?: number }>()
const shown = computed(() => (props.max ? props.items.slice(0, props.max) : props.items))
</script>

<template>
  <ul class="tags" aria-label="Technologies">
    <li v-for="item in shown" :key="item" class="tag">{{ item }}</li>
  </ul>
</template>

<style scoped>
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  list-style: none;
  margin: 0;
  padding: 0;
}

.tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent);
  background: var(--accent-soft);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0.15rem 0.6rem;
  white-space: nowrap;
}
</style>
```

- [ ] **Step 4: Write `src/components/ProjectCard.vue`**

```vue
<script setup lang="ts">
import type { Project } from '../content/types'
import StackTags from './StackTags.vue'

defineProps<{ project: Project }>()
</script>

<template>
  <RouterLink :to="`/work/${project.slug}`" class="card">
    <div class="card__media">
      <img v-if="project.thumbnail" :src="project.thumbnail" :alt="`${project.title} screenshot`" loading="lazy" />
      <div v-else class="card__placeholder" aria-hidden="true">
        <span>{{ project.title }}</span>
        <small>NDA · no screenshots</small>
      </div>
    </div>
    <div class="card__body">
      <div class="card__meta">{{ project.employer }} · {{ project.year }}</div>
      <h3 class="card__title">{{ project.title }}</h3>
      <p class="card__summary">{{ project.summary }}</p>
      <StackTags :items="project.stack" :max="4" />
    </div>
  </RouterLink>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  color: var(--text);
  transition: border-color 150ms ease, transform 150ms ease;
}

.card:hover {
  text-decoration: none;
  border-color: var(--accent);
  transform: translateY(-2px);
}

.card__media {
  aspect-ratio: 16 / 10;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}

.card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top left;
}

.card__placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: var(--space-5);
  font-family: var(--font-display);
  font-size: var(--step-2);
  background: linear-gradient(135deg, var(--accent-soft), var(--bg));
}

.card__placeholder small {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
}

.card__body {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.card__meta {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
}

.card__title {
  font-size: var(--step-1);
}

.card__summary {
  color: var(--text-muted);
  margin: 0;
  font-size: var(--step--1);
  flex: 1;
}
</style>
```

- [ ] **Step 5: Write `src/components/ProjectGrid.vue`**

```vue
<script setup lang="ts">
import { projects } from '../content/projects'
import ProjectCard from './ProjectCard.vue'
</script>

<template>
  <section id="work" class="section">
    <div class="container">
      <p class="eyebrow">Selected work</p>
      <h2 class="section-title">Six projects, all in production.</h2>
      <div class="grid">
        <ProjectCard v-for="p in projects" :key="p.slug" :project="p" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-5);
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
```

- [ ] **Step 6: Write `src/components/HeroSection.vue`**

```vue
<script setup lang="ts">
import { profile } from '../content/profile'
</script>

<template>
  <section class="hero">
    <div class="container">
      <p class="eyebrow">{{ profile.title }} · Cambridge, Ohio</p>
      <h1 class="hero__headline">{{ profile.headline }}</h1>
      <p class="hero__pitch">{{ profile.pitch }}</p>
      <div class="hero__actions">
        <RouterLink :to="{ path: '/', hash: '#work' }" class="btn btn-primary">See the work</RouterLink>
        <a :href="profile.resumeUrl" class="btn btn-ghost" download>Download resume</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-block: var(--space-8) var(--space-8);
  background:
    radial-gradient(60rem 30rem at 80% -10%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%);
}

.hero__headline {
  max-width: 14ch;
  margin-bottom: var(--space-5);
}

.hero__pitch {
  font-size: var(--step-1);
  color: var(--text-muted);
  max-width: 38rem;
  margin-bottom: var(--space-6);
}

.hero__actions {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}
</style>
```

- [ ] **Step 7: Run the test to verify it passes**

```bash
cd C:/Users/Cjank/source/repos/Portfolio && npx vitest run src/__tests__/ProjectGrid.test.ts
```

Expected: 3 passed.

- [ ] **Step 8: Commit**

```bash
cd C:/Users/Cjank/source/repos/Portfolio
git add src/components/HeroSection.vue src/components/StackTags.vue src/components/ProjectCard.vue src/components/ProjectGrid.vue src/__tests__/ProjectGrid.test.ts
git commit -m "Add hero, stack tags, project card, and project grid

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_016aE4wJ5PNigm71ym8cwc8n"
```

---

### Task 7: Experience, Skills, About, Contact, and the assembled Home page

**Files:**
- Create: `src/components/ExperienceTimeline.vue`, `src/components/SkillGroups.vue`, `src/components/AboutSection.vue`, `src/components/ContactSection.vue`
- Modify: `src/pages/HomePage.vue`
- Test: `src/__tests__/HomePage.test.ts`

**Interfaces:**
- Consumes: `experience`, `skillGroups`, `profile`, `HeroSection`, `ProjectGrid`.
- Produces: `HomePage` with sections in order hero, `#work`, `#experience`, `#skills`, `#about`, `#contact`.

- [ ] **Step 1: Write the failing test**

`src/__tests__/HomePage.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory } from 'vue-router'
import { createAppRouter } from '../router'
import HomePage from '../pages/HomePage.vue'
import { projects } from '../content/projects'
import { experience } from '../content/experience'

async function mountHome() {
  const router = createAppRouter(createMemoryHistory())
  await router.push('/')
  await router.isReady()
  return mount(HomePage, { global: { plugins: [router] } })
}

describe('HomePage', () => {
  it('has the sections in order', async () => {
    const wrapper = await mountHome()
    const ids = wrapper.findAll('section[id]').map((s) => s.attributes('id'))
    expect(ids).toEqual(['work', 'experience', 'skills', 'about', 'contact'])
  })

  it('shows the title and never Jr', async () => {
    const wrapper = await mountHome()
    expect(wrapper.text()).toContain('Full Stack Developer')
    expect(wrapper.text()).not.toMatch(/\bJr\b/)
  })

  it('renders every project card and every experience entry', async () => {
    const wrapper = await mountHome()
    expect(wrapper.findAll('a.card')).toHaveLength(projects.length)
    expect(wrapper.findAll('.timeline__item')).toHaveLength(experience.length)
  })

  it('links to the resume PDF', async () => {
    const wrapper = await mountHome()
    const links = wrapper.findAll('a[href="/Chris_Janke_Resume.pdf"]')
    expect(links.length).toBeGreaterThanOrEqual(2)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd C:/Users/Cjank/source/repos/Portfolio && npx vitest run src/__tests__/HomePage.test.ts
```

Expected: FAIL on section order (placeholder HomePage has no sections).

- [ ] **Step 3: Write `src/components/ExperienceTimeline.vue`**

```vue
<script setup lang="ts">
import { experience } from '../content/experience'
</script>

<template>
  <section id="experience" class="section">
    <div class="container">
      <p class="eyebrow">Experience</p>
      <h2 class="section-title">Where I've shipped.</h2>
      <ol class="timeline">
        <li v-for="item in experience" :key="item.company + item.role" class="timeline__item" :class="{ 'timeline__item--compact': item.compact }">
          <div class="timeline__when">{{ item.start }} – {{ item.end }}</div>
          <div class="timeline__what">
            <h3 class="timeline__role">{{ item.role }}</h3>
            <div class="timeline__company">{{ item.company }} · {{ item.location }}</div>
            <p class="timeline__summary">{{ item.summary }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-6);
}

.timeline__item {
  display: grid;
  grid-template-columns: 11rem 1fr;
  gap: var(--space-5);
  padding-left: var(--space-5);
  border-left: 2px solid var(--border);
}

.timeline__item:first-child {
  border-left-color: var(--accent);
}

.timeline__when {
  font-family: var(--font-mono);
  font-size: var(--step--1);
  color: var(--text-muted);
  padding-top: 0.35rem;
}

.timeline__role {
  font-size: var(--step-1);
}

.timeline__company {
  color: var(--text-muted);
  margin-block: var(--space-1) var(--space-3);
}

.timeline__summary {
  margin: 0;
}

.timeline__item--compact .timeline__role {
  font-size: var(--step-0);
  font-family: var(--font-body);
  font-weight: 500;
}

.timeline__item--compact .timeline__summary {
  color: var(--text-muted);
  font-size: var(--step--1);
}

@media (max-width: 640px) {
  .timeline__item {
    grid-template-columns: 1fr;
    gap: var(--space-2);
  }
}
</style>
```

- [ ] **Step 4: Write `src/components/SkillGroups.vue`**

```vue
<script setup lang="ts">
import { skillGroups } from '../content/skills'
import StackTags from './StackTags.vue'
</script>

<template>
  <section id="skills" class="section">
    <div class="container">
      <p class="eyebrow">Skills</p>
      <h2 class="section-title">What I work in.</h2>
      <div class="groups">
        <div v-for="group in skillGroups" :key="group.name" class="group">
          <h3 class="group__name">{{ group.name }}</h3>
          <StackTags :items="group.items" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.groups {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
}

.group__name {
  font-size: var(--step-1);
  margin-bottom: var(--space-3);
}

@media (max-width: 640px) {
  .groups {
    grid-template-columns: 1fr;
  }
}
</style>
```

- [ ] **Step 5: Write `src/components/AboutSection.vue`**

```vue
<script setup lang="ts">
import { profile } from '../content/profile'
</script>

<template>
  <section id="about" class="section">
    <div class="container about">
      <div>
        <p class="eyebrow">About</p>
        <h2 class="section-title">Self-taught, customer-tested.</h2>
      </div>
      <div class="about__body">
        <p v-for="(para, i) in profile.about" :key="i">{{ para }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: var(--space-6);
}

.about__body p {
  font-size: var(--step-1);
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .about {
    grid-template-columns: 1fr;
  }
}
</style>
```

- [ ] **Step 6: Write `src/components/ContactSection.vue`**

```vue
<script setup lang="ts">
import { profile } from '../content/profile'
</script>

<template>
  <section id="contact" class="section">
    <div class="container">
      <p class="eyebrow">Contact</p>
      <h2 class="section-title">Let's talk.</h2>
      <p class="contact__lead">
        I'm open to full-time developer roles and select contract work. Email is the fastest way to reach me.
      </p>
      <div class="contact__links">
        <a :href="`mailto:${profile.email}`" class="btn btn-primary">{{ profile.email }}</a>
        <a :href="profile.linkedin" class="btn btn-ghost" target="_blank" rel="noreferrer">LinkedIn</a>
        <a :href="profile.github" class="btn btn-ghost" target="_blank" rel="noreferrer">GitHub</a>
        <a :href="profile.resumeUrl" class="btn btn-ghost" download>Resume (PDF)</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact__lead {
  font-size: var(--step-1);
  color: var(--text-muted);
  margin-bottom: var(--space-6);
}

.contact__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}
</style>
```

- [ ] **Step 7: Write the real `src/pages/HomePage.vue`**

```vue
<script setup lang="ts">
import HeroSection from '../components/HeroSection.vue'
import ProjectGrid from '../components/ProjectGrid.vue'
import ExperienceTimeline from '../components/ExperienceTimeline.vue'
import SkillGroups from '../components/SkillGroups.vue'
import AboutSection from '../components/AboutSection.vue'
import ContactSection from '../components/ContactSection.vue'
</script>

<template>
  <HeroSection />
  <ProjectGrid />
  <ExperienceTimeline />
  <SkillGroups />
  <AboutSection />
  <ContactSection />
</template>
```

- [ ] **Step 8: Run tests and build**

```bash
cd C:/Users/Cjank/source/repos/Portfolio && npm run test && npm run build
```

Expected: all pass, build succeeds.

- [ ] **Step 9: Commit**

```bash
cd C:/Users/Cjank/source/repos/Portfolio
git add src/components src/pages/HomePage.vue src/__tests__/HomePage.test.ts
git commit -m "Add experience, skills, about, contact, and assemble home page

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_016aE4wJ5PNigm71ym8cwc8n"
```

---

### Task 8: StorySoftEmbed with fallback

**Files:**
- Create: `src/components/StorySoftEmbed.vue`
- Test: `src/__tests__/StorySoftEmbed.test.ts`

**Interfaces:**
- Consumes: `ProjectEmbed`, `ProjectImage` types.
- Produces: `StorySoftEmbed` props `{ embed: ProjectEmbed; fallback?: ProjectImage }`. Exports `SCRIPT_URLS` and `resetScriptCache()` for tests.

- [ ] **Step 1: Write the failing test**

`src/__tests__/StorySoftEmbed.test.ts`:
```ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import StorySoftEmbed, { SCRIPT_URLS, resetScriptCache } from '../components/StorySoftEmbed.vue'

const fallback = { src: '/fake.png', alt: 'fallback' }

function scriptFor(kind: 'webframe' | 'player') {
  return document.head.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_URLS[kind]}"]`)
}

describe('StorySoftEmbed', () => {
  beforeEach(() => {
    document.head.querySelectorAll('script[data-storysoft]').forEach((s) => s.remove())
    resetScriptCache()
    vi.useRealTimers()
  })

  it('injects the module script once and renders the custom element', async () => {
    const embed = { kind: 'player' as const, attrs: { source: 'https://example.test/story' } }
    mount(StorySoftEmbed, { props: { embed, fallback } })
    mount(StorySoftEmbed, { props: { embed, fallback } })
    const scripts = document.head.querySelectorAll(`script[src="${SCRIPT_URLS.player}"]`)
    expect(scripts).toHaveLength(1)
    expect(scripts[0]!.getAttribute('type')).toBe('module')
  })

  it('renders the custom element with the given attributes', () => {
    const embed = { kind: 'webframe' as const, attrs: { 'client-name': 'storysoft', 'webframe-id': 'x' } }
    const wrapper = mount(StorySoftEmbed, { props: { embed, fallback } })
    const el = wrapper.find('storysoft-webframe')
    expect(el.exists()).toBe(true)
    expect(el.attributes('client-name')).toBe('storysoft')
  })

  it('shows the fallback image when the script fails to load', async () => {
    const embed = { kind: 'player' as const, attrs: { source: 'x' } }
    const wrapper = mount(StorySoftEmbed, { props: { embed, fallback } })
    scriptFor('player')!.dispatchEvent(new Event('error'))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('storysoft-player').exists()).toBe(false)
    expect(wrapper.find('img').attributes('src')).toBe('/fake.png')
    expect(wrapper.text()).toContain('could not load')
  })

  it('shows the fallback if the element never upgrades before the timeout', async () => {
    vi.useFakeTimers()
    const embed = { kind: 'webframe' as const, attrs: {} }
    const wrapper = mount(StorySoftEmbed, { props: { embed, fallback } })
    vi.advanceTimersByTime(10_000)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('img').exists()).toBe(true)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd C:/Users/Cjank/source/repos/Portfolio && npx vitest run src/__tests__/StorySoftEmbed.test.ts
```

Expected: FAIL, cannot resolve `StorySoftEmbed.vue`.

- [ ] **Step 3: Write `src/components/StorySoftEmbed.vue`**

```vue
<script lang="ts">
export const SCRIPT_URLS = {
  player: 'https://public.storysoft.io/static/@storysoft/storysoft-player/latest/storysoftPlayer.es.js',
  webframe: 'https://public.storysoft.io/static/@storysoft/storysoft-webframe/latest/storysoftWebframe.es.js',
} as const

const UPGRADE_TIMEOUT_MS = 8000

let pending: Partial<Record<keyof typeof SCRIPT_URLS, Promise<void>>> = {}

export function resetScriptCache() {
  pending = {}
}

function loadScript(kind: keyof typeof SCRIPT_URLS): Promise<void> {
  const existing = pending[kind]
  if (existing) return existing
  const promise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'module'
    script.src = SCRIPT_URLS[kind]
    script.dataset.storysoft = kind
    script.addEventListener('load', () => resolve())
    script.addEventListener('error', () => reject(new Error(`Failed to load ${kind} script`)))
    document.head.appendChild(script)
  })
  pending[kind] = promise
  return promise
}
</script>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { ProjectEmbed, ProjectImage } from '../content/types'

const props = defineProps<{ embed: ProjectEmbed; fallback?: ProjectImage }>()

const failed = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  const tag = `storysoft-${props.embed.kind}`
  timer = setTimeout(() => {
    if (!customElements.get(tag)) failed.value = true
  }, UPGRADE_TIMEOUT_MS)

  loadScript(props.embed.kind).catch(() => {
    failed.value = true
  })
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <div class="embed">
    <template v-if="failed">
      <img v-if="fallback" :src="fallback.src" :alt="fallback.alt" />
      <p class="embed__note">The live StorySoft embed could not load here, so this is a screenshot instead.</p>
    </template>
    <component :is="`storysoft-${embed.kind}`" v-else v-bind="embed.attrs" />
  </div>
</template>

<style scoped>
.embed {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  overflow: hidden;
}

.embed__note {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
  margin: var(--space-3) 0 0;
}
</style>
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
cd C:/Users/Cjank/source/repos/Portfolio && npx vitest run src/__tests__/StorySoftEmbed.test.ts
```

Expected: 4 passed. If the second `<script>` block causes a vue-tsc complaint about `export` in a non-setup block, that is supported by Vue SFC and vue-tsc 3; if the test for the timeout fails because `customElements` is undefined in jsdom, add `if (typeof customElements === 'undefined' || !customElements.get(tag))` to the timeout check.

- [ ] **Step 5: Build and commit**

```bash
cd C:/Users/Cjank/source/repos/Portfolio && npm run build
git add src/components/StorySoftEmbed.vue src/__tests__/StorySoftEmbed.test.ts
git commit -m "Add StorySoftEmbed with script loading and screenshot fallback

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_016aE4wJ5PNigm71ym8cwc8n"
```

---

### Task 9: Case study page

**Files:**
- Modify: `src/pages/CaseStudyPage.vue`
- Test: `src/__tests__/CaseStudyPage.test.ts`

**Interfaces:**
- Consumes: `getProject`, `getAdjacent`, `StackTags`, `StorySoftEmbed`.
- Produces: `CaseStudyPage` prop `slug: string`; redirects to `/` when the slug is unknown.

- [ ] **Step 1: Write the failing test**

`src/__tests__/CaseStudyPage.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory } from 'vue-router'
import { createAppRouter } from '../router'
import CaseStudyPage from '../pages/CaseStudyPage.vue'
import { projects } from '../content/projects'

async function mountCase(slug: string) {
  const router = createAppRouter(createMemoryHistory())
  await router.push(`/work/${slug}`)
  await router.isReady()
  const wrapper = mount(CaseStudyPage, { props: { slug }, global: { plugins: [router] } })
  await wrapper.vm.$nextTick()
  return { wrapper, router }
}

describe('CaseStudyPage', () => {
  it('renders title, meta, and all three sections', async () => {
    const { wrapper } = await mountCase('napa-invoices')
    expect(wrapper.find('h1').text()).toBe('NAPA Invoices')
    expect(wrapper.text()).toContain('NAPA Auto Parts')
    expect(wrapper.findAll('h2').slice(0, 3).map((h) => h.text())).toEqual(['Problem', 'What I built', 'Outcome'])
    expect(wrapper.findAll('.gallery img')).toHaveLength(3)
  })

  it('shows prev/next links that wrap around', async () => {
    const { wrapper } = await mountCase(projects[0]!.slug)
    expect(wrapper.find('a.pager__prev').attributes('href')).toBe(`/work/${projects[projects.length - 1]!.slug}`)
    expect(wrapper.find('a.pager__next').attributes('href')).toBe(`/work/${projects[1]!.slug}`)
  })

  it('renders the live embed for StorySoft projects', async () => {
    const { wrapper } = await mountCase('webframe')
    expect(wrapper.find('storysoft-webframe').exists()).toBe(true)
  })

  it('shows the NDA note and no gallery for the OEM project', async () => {
    const { wrapper } = await mountCase('aci-oem-quoting')
    expect(wrapper.find('.gallery').exists()).toBe(false)
    expect(wrapper.text()).toContain('non-disclosure')
  })

  it('redirects to home for an unknown slug', async () => {
    const { router } = await mountCase('does-not-exist')
    await router.isReady()
    await new Promise((r) => setTimeout(r, 0))
    expect(router.currentRoute.value.path).toBe('/')
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd C:/Users/Cjank/source/repos/Portfolio && npx vitest run src/__tests__/CaseStudyPage.test.ts
```

Expected: FAIL, placeholder page renders the slug as the h1.

- [ ] **Step 3: Write `src/pages/CaseStudyPage.vue`**

```vue
<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { getProject, getAdjacent } from '../content/projects'
import StackTags from '../components/StackTags.vue'
import StorySoftEmbed from '../components/StorySoftEmbed.vue'

const props = defineProps<{ slug: string }>()
const router = useRouter()

const project = computed(() => getProject(props.slug))
const adjacent = computed(() => getAdjacent(props.slug))

watchEffect(() => {
  if (!project.value) router.replace('/')
})
</script>

<template>
  <article v-if="project" class="case">
    <div class="container">
      <RouterLink :to="{ path: '/', hash: '#work' }" class="case__back">← All work</RouterLink>

      <header class="case__header">
        <p class="eyebrow">{{ project.employer }} · {{ project.year }}</p>
        <h1>{{ project.title }}</h1>
        <p class="case__summary">{{ project.summary }}</p>
        <dl class="case__meta">
          <div><dt>Role</dt><dd>{{ project.role }}</dd></div>
          <div><dt>Stack</dt><dd><StackTags :items="project.stack" /></dd></div>
        </dl>
      </header>

      <StorySoftEmbed v-if="project.embed" :embed="project.embed" :fallback="project.images[0]" class="case__embed" />

      <div v-if="project.images.length" class="gallery">
        <figure v-for="img in project.images" :key="img.src">
          <img :src="img.src" :alt="img.alt" loading="lazy" />
          <figcaption>{{ img.alt }}</figcaption>
        </figure>
      </div>

      <div class="case__body">
        <section v-for="s in project.sections" :key="s.heading" class="case__section">
          <h2>{{ s.heading }}</h2>
          <p v-for="(para, i) in s.paragraphs" :key="i">{{ para }}</p>
        </section>

        <section v-if="project.links?.length" class="case__section">
          <h2>Links</h2>
          <ul class="case__links">
            <li v-for="link in project.links" :key="link.href">
              <a :href="link.href" target="_blank" rel="noreferrer">{{ link.label }} ↗</a>
            </li>
          </ul>
        </section>
      </div>

      <nav v-if="adjacent" class="pager" aria-label="Other projects">
        <RouterLink :to="`/work/${adjacent.prev.slug}`" class="pager__prev">
          <span class="pager__label">Previous</span>
          <span class="pager__title">{{ adjacent.prev.title }}</span>
        </RouterLink>
        <RouterLink :to="`/work/${adjacent.next.slug}`" class="pager__next">
          <span class="pager__label">Next</span>
          <span class="pager__title">{{ adjacent.next.title }}</span>
        </RouterLink>
      </nav>
    </div>
  </article>
</template>

<style scoped>
.case {
  padding-block: var(--space-6) var(--space-8);
}

.case__back {
  font-family: var(--font-mono);
  font-size: var(--step--1);
  color: var(--text-muted);
}

.case__header {
  margin-block: var(--space-6) var(--space-7);
  max-width: 48rem;
}

.case__summary {
  font-size: var(--step-1);
  color: var(--text-muted);
  margin-block: var(--space-4) var(--space-5);
}

.case__meta {
  display: flex;
  gap: var(--space-6);
  flex-wrap: wrap;
  margin: 0;
}

.case__meta dt {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin-bottom: var(--space-1);
}

.case__meta dd {
  margin: 0;
}

.case__embed {
  margin-bottom: var(--space-7);
}

.gallery {
  display: grid;
  gap: var(--space-5);
  margin-bottom: var(--space-7);
}

.gallery figure {
  margin: 0;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.gallery figcaption {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
  padding: var(--space-3) var(--space-4);
  border-top: 1px solid var(--border);
}

.case__body {
  max-width: var(--measure);
  display: grid;
  gap: var(--space-6);
}

.case__section h2 {
  font-size: var(--step-2);
  margin-bottom: var(--space-3);
}

.case__section p {
  font-size: var(--step-1);
}

.case__links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.pager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  margin-top: var(--space-8);
  border-top: 1px solid var(--border);
  padding-top: var(--space-5);
}

.pager a {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  color: var(--text);
  padding: var(--space-4);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.pager a:hover {
  text-decoration: none;
  border-color: var(--accent);
}

.pager__next {
  text-align: right;
}

.pager__label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
}

.pager__title {
  font-family: var(--font-display);
  font-size: var(--step-1);
}

@media (max-width: 640px) {
  .pager {
    grid-template-columns: 1fr;
  }
  .pager__next {
    text-align: left;
  }
}
</style>
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
cd C:/Users/Cjank/source/repos/Portfolio && npx vitest run src/__tests__/CaseStudyPage.test.ts
```

Expected: 5 passed.

- [ ] **Step 5: Run everything, build, and check in the browser**

```bash
cd C:/Users/Cjank/source/repos/Portfolio && npm run test && npm run build
```

Then start `npm run dev` in the background and confirm in a browser that:
- `/` renders all sections with the dark theme and fonts.
- `/work/webframe` shows the live StorySoft gallery below the header (needs internet).
- `/work/player` shows the live Nuulife demo Story.
- `/work/aci-oem-quoting` shows the placeholder card on home and no gallery on the page.
- Resizing to 400px wide gives a single-column grid and stacked timeline.

Stop the dev server when done.

- [ ] **Step 6: Commit**

```bash
cd C:/Users/Cjank/source/repos/Portfolio
git add src/pages/CaseStudyPage.vue src/__tests__/CaseStudyPage.test.ts
git commit -m "Add case study page with gallery, embed, sections, and pager

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_016aE4wJ5PNigm71ym8cwc8n"
```

---

### Task 10: Resume HTML and PDF build

**Files:**
- Create: `resume/resume.html`, `resume/build-pdf.ps1`, `public/Chris_Janke_Resume.pdf` (generated)
- Test: `src/__tests__/resume.test.ts`

**Interfaces:**
- Produces: `public/Chris_Janke_Resume.pdf` served at `/Chris_Janke_Resume.pdf`, which `profile.resumeUrl` already points to.

- [ ] **Step 1: Write the failing test**

`src/__tests__/resume.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../../', import.meta.url))

describe('resume', () => {
  it('source HTML uses the Full Stack Developer title, no Jr, no Education section', () => {
    const html = readFileSync(resolve(root, 'resume/resume.html'), 'utf8')
    expect(html).toContain('Full Stack Developer')
    expect(html).not.toMatch(/\bJr\b/)
    expect(html).not.toMatch(/Education/i)
    expect(html).not.toMatch(/High school/i)
  })

  it('PDF exists in public and is non-trivial', () => {
    const pdf = resolve(root, 'public/Chris_Janke_Resume.pdf')
    expect(existsSync(pdf)).toBe(true)
    expect(statSync(pdf).size).toBeGreaterThan(20_000)
    expect(readFileSync(pdf).subarray(0, 4).toString()).toBe('%PDF')
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd C:/Users/Cjank/source/repos/Portfolio && npx vitest run src/__tests__/resume.test.ts
```

Expected: FAIL, `resume/resume.html` not found.

- [ ] **Step 3: Write `resume/resume.html`**

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Chris Janke · Full Stack Developer</title>
<style>
  @page { size: Letter; margin: 0.55in 0.6in; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: "Segoe UI", Calibri, Arial, sans-serif;
    font-size: 10.2pt;
    line-height: 1.38;
    color: #1a1a1a;
  }
  h1, h2, h3 { margin: 0; font-family: Georgia, "Times New Roman", serif; font-weight: 500; }
  h1 { font-size: 24pt; letter-spacing: -0.01em; }
  h2 { font-size: 10.5pt; text-transform: uppercase; letter-spacing: 0.1em; color: #1f4e8c; border-bottom: 1px solid #c9d3e3; padding-bottom: 3px; margin: 13pt 0 7pt; font-family: "Segoe UI", Calibri, Arial, sans-serif; font-weight: 600; }
  h3 { font-size: 11.5pt; font-family: "Segoe UI", Calibri, Arial, sans-serif; font-weight: 600; }
  p { margin: 0; }
  a { color: #1f4e8c; text-decoration: none; }
  .header { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; }
  .title { font-size: 12pt; color: #1f4e8c; margin-top: 2px; }
  .contact { text-align: right; font-size: 9.4pt; color: #444; line-height: 1.5; }
  .summary { margin-top: 6pt; }
  .job { margin-bottom: 8pt; }
  .job-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
  .job-meta { font-size: 9.4pt; color: #555; white-space: nowrap; }
  .job-sub { color: #444; font-size: 9.6pt; margin-bottom: 2pt; }
  ul { margin: 2pt 0 0; padding-left: 16px; }
  li { margin-bottom: 1.5pt; }
  .compact { color: #444; font-size: 9.6pt; }
  .skills { display: grid; grid-template-columns: 7.2em 1fr; row-gap: 3pt; column-gap: 8px; }
  .skills dt { font-weight: 600; color: #333; }
  .skills dd { margin: 0; color: #222; }
  .footer { margin-top: 10pt; font-size: 8.8pt; color: #666; }
</style>
</head>
<body>

<header class="header">
  <div>
    <h1>Chris Janke</h1>
    <div class="title">Full Stack Developer</div>
  </div>
  <div class="contact">
    Cambridge, OH 43725 · +1 614 307 2517<br />
    <a href="mailto:jankrodev@gmail.com">jankrodev@gmail.com</a><br />
    <a href="https://jankrodev.netlify.app/">jankrodev.netlify.app</a> ·
    <a href="https://github.com/JankroDev">github.com/JankroDev</a> ·
    <a href="https://www.linkedin.com/in/chris-janke-b58a76231/">LinkedIn</a>
  </div>
</header>

<p class="summary">
  Full stack developer with four years on StorySoft's healthcare marketing platform and seven years shipping software for paying customers. At StorySoft I build the Story Builder editor, the embeddable Webframe and Player custom elements, and the analytics that connect them, on a Vue 3, TypeScript, .NET/C#, MongoDB, and AWS stack. Before that I delivered custom line-of-business software for NAPA Auto Parts and ACI Services that is still in daily use.
</p>

<h2>Experience</h2>

<div class="job">
  <div class="job-head"><h3>Full Stack Developer, StorySoft LLC</h3><span class="job-meta">Apr 2022 – Present · Remote</span></div>
  <div class="job-sub">Digital experience platform for pharma brands and their agencies (HCP and patient Stories, embeds, analytics)</div>
  <ul>
    <li>Build and maintain Story Builder, the drag-and-drop Vue editor agencies use to design responsive, MLR-compliant Stories; shipped the Lottie animation player component and the analytics integration that reports engagement from every Story.</li>
    <li>Built the Webframe and Player as Vue 3 + TypeScript custom elements so clients embed Story galleries and playback on any site with one script tag, including visit tracking, campaign attribution, and Google Analytics integration.</li>
    <li>Develop .NET/C# services and data access against MongoDB and MySQL, including performance work on backend query logic for client and agency sites.</li>
    <li>Own CI/CD on AWS CodePipeline (and Bitbucket Pipelines previously) for platform deployments.</li>
    <li>Triage and resolve bug tickets across the platform, reducing turnaround on customer-reported issues.</li>
    <li>Train interns on platform SDKs and workflows, shortening onboarding.</li>
  </ul>
</div>

<div class="job">
  <div class="job-head"><h3>Software Engineer, NAPA Auto Parts</h3><span class="job-meta">Jan 2022 – Feb 2022 · Cambridge, OH</span></div>
  <ul>
    <li>Built a customer invoice portal (React, Firebase Auth, Firestore) with a Python OCR pipeline (pytesseract) that extracts invoice number, date, and total from scans, cutting weekly invoicing for a major account to scan-and-upload and retaining the account.</li>
  </ul>
</div>

<div class="job">
  <div class="job-head"><h3>Software Engineer (Contract), ACI Services</h3><span class="job-meta">Jan 2019 – Feb 2021 · Cambridge, OH</span></div>
  <ul>
    <li>Built an ASP.NET MVC / SQL Server OEM quoting site that aggregates cost, assembly, and margin data across databases; average quote time dropped from days to hours and the sales team quotes from one source of truth.</li>
    <li>Built a browser-based tag printer tool (jQuery, JavaScript, Java, SQL) that lets shop techs lay out laser-etched compressor labels and save templates directly to the label database, removing the designer from the loop.</li>
    <li>Owned all project code end to end, working with a senior developer and project stakeholders on requirements and revisions.</li>
  </ul>
</div>

<div class="job compact">
  <div class="job-head"><h3 style="font-size:10.5pt">Store Manager, NAPA Auto Parts</h3><span class="job-meta">Apr 2014 – Apr 2022 · Cambridge, OH</span></div>
  <p>Ran daily operations for a retail and commercial parts store before moving into software full time.</p>
</div>

<h2>Skills</h2>
<dl class="skills">
  <dt>Frontend</dt><dd>Vue 3, TypeScript, JavaScript, React, HTML/CSS, Web Components, Lottie</dd>
  <dt>Backend</dt><dd>.NET / C#, ASP.NET MVC, Node.js, REST APIs, Python</dd>
  <dt>Data &amp; Cloud</dt><dd>MongoDB, MySQL, SQL Server, Firebase, AWS, AWS CodePipeline, Bitbucket Pipelines</dd>
  <dt>Practices</dt><dd>Git, Agile, unit testing, analytics integration, SDK onboarding and intern training, MLR-compliant pharma tooling</dd>
</dl>

<p class="footer">Authorized to work in the US for any employer.</p>

</body>
</html>
```

- [ ] **Step 4: Write `resume/build-pdf.ps1`**

```powershell
# Renders resume/resume.html to public/Chris_Janke_Resume.pdf with headless Edge.
$ErrorActionPreference = 'Stop'
$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
if (-not (Test-Path $edge)) { $edge = 'C:\Program Files\Microsoft\Edge\Application\msedge.exe' }
if (-not (Test-Path $edge)) { throw 'Microsoft Edge not found.' }

$root = Split-Path -Parent $PSScriptRoot
$src = Join-Path $PSScriptRoot 'resume.html'
$out = Join-Path $root 'public\Chris_Janke_Resume.pdf'
$srcUrl = 'file:///' + ($src -replace '\\', '/')

& $edge --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=4000 "--print-to-pdf=$out" $srcUrl | Out-Null

if (-not (Test-Path $out)) { throw "PDF was not written to $out" }
Write-Host "Wrote $out ($((Get-Item $out).Length) bytes)"
```

- [ ] **Step 5: Generate the PDF and eyeball it**

```bash
cd C:/Users/Cjank/source/repos/Portfolio && powershell -NoProfile -ExecutionPolicy Bypass -File resume/build-pdf.ps1
```

Expected: `Wrote ...Chris_Janke_Resume.pdf (NNNN bytes)`. Open the PDF with the Read tool and confirm it is one page, the header and four jobs are visible, and nothing is cut off. If it spills to two pages, reduce `body` font-size to 9.8pt or trim the StorySoft bullets to five.

- [ ] **Step 6: Run the test to verify it passes**

```bash
cd C:/Users/Cjank/source/repos/Portfolio && npx vitest run src/__tests__/resume.test.ts
```

Expected: 2 passed.

- [ ] **Step 7: Commit**

```bash
cd C:/Users/Cjank/source/repos/Portfolio
git add resume public/Chris_Janke_Resume.pdf src/__tests__/resume.test.ts
git commit -m "Add rewritten resume as HTML with Edge PDF build

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_016aE4wJ5PNigm71ym8cwc8n"
```

---

### Task 11: README, final verification, and handoff

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Rewrite `README.md`**

```markdown
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
```

- [ ] **Step 2: Grep for forbidden strings and run the full suite**

```bash
cd C:/Users/Cjank/source/repos/Portfolio
grep -rn --include='*.ts' --include='*.vue' --include='*.html' -E '\bJr\b' src resume index.html || echo "no Jr found"
grep -rn -i 'bootstrap' src index.html package.json || echo "no bootstrap found"
npm run test && npm run build
```

Expected: both greps print their "no ... found" line, tests pass, build succeeds.

- [ ] **Step 3: Preview the production build**

```bash
cd C:/Users/Cjank/source/repos/Portfolio && npm run preview
```

Open the printed URL, click through all six case studies, confirm the resume download link returns a PDF, confirm deep-linking to `/work/player` works after a hard refresh. Stop the preview server.

- [ ] **Step 4: Commit and report**

```bash
cd C:/Users/Cjank/source/repos/Portfolio
git add README.md
git commit -m "Update README for the Vue rebuild

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_016aE4wJ5PNigm71ym8cwc8n"
git log --oneline master..rebuild/vue-portfolio
```

Report to the user: the branch name, the list of commits, anything that could not be verified (for example live embeds if offline), and that merging `rebuild/vue-portfolio` into `master` deploys to Netlify. Ask the user to review the StorySoft copy in `src/content/projects.ts` and the resume bullets in `resume/resume.html` before merging.
