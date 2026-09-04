# Portfolio Rebuild — Design Spec

Date: 2026-09-04
Owner: Chris Janke (jankrodev@gmail.com)
Status: Approved for planning

## 1. Goal

Rebuild https://jankrodev.netlify.app so it presents Chris as an experienced
Full Stack Developer rather than a junior. Primary audience is recruiters and
hiring managers for a full-time developer role; secondary audience is business
owners looking for contract work. The rebuild also produces a rewritten,
downloadable resume that tells the same story as the site.

Success looks like: a reader lands on the home page, understands within ten
seconds that Chris builds platform-level software at StorySoft, and can reach a
detailed, shareable case study for any of six projects in one click.

## 2. Decisions already made

| Topic | Decision |
|---|---|
| Stack | Vite + Vue 3 + TypeScript, `<script setup lang="ts">` |
| Routing | vue-router, history mode, Netlify SPA redirect |
| Styling | Plain CSS with custom properties, no Bootstrap |
| Visual direction | Dark palette (navy ground, off-white text, blue accent, monospace labels) with an editorial layout (serif display headline, generous whitespace, long-form case studies) |
| Structure | One scrolling home page plus one route per case study (`/work/:slug`) |
| Case studies | Six, each its own page: Story Builder, Webframe, Player, NAPA Invoices, ACI Tag Printer, ACI OEM Quoting |
| StorySoft disclosure | Screenshots of the Builder and live embeds of the public player/webframe are fine. No source code, no internal architecture details. |
| Resume | Full rewrite, authored as HTML, exported to PDF with headless Edge, hosted at `public/Chris_Janke_Resume.pdf`. No Education section. |
| Hosting | Netlify, same site, deploys from `master` |
| Repo | Rebuild in place in the existing repo; Create React App files removed |
| Tests | Vitest + Vue Test Utils, light coverage on the content model and routes; production build must pass type-check |

## 3. Content

### 3.1 Positioning

- Title used everywhere: **Full Stack Developer**. The word "Jr" does not appear anywhere.
- Hero headline: **Software people use every day.**
- Hero pitch: "Full stack developer at StorySoft since 2022, building the story
  editor, embeddable player, and analytics that healthcare marketing agencies
  run on. Before that, custom business software for NAPA Auto Parts and ACI
  Services."
- Hero buttons: **See the work** (scrolls to the project grid) and **Download
  resume** (links to the PDF).
- Header: name at left; Work, Experience, About, Contact anchors; small icon
  links for Email, GitHub (github.com/JankroDev), LinkedIn
  (linkedin.com/in/chris-janke-b58a76231).

### 3.2 Home page sections, in order

1. **Hero** as above.
2. **Selected work**: six cards, StorySoft projects first (Story Builder,
   Webframe, Player, NAPA Invoices, ACI Tag Printer, ACI OEM Quoting). Each card
   shows a thumbnail, title, one-line summary, employer, year, and up to four
   stack tags. Clicking navigates to `/work/:slug`.
3. **Experience timeline**:
   - StorySoft LLC, Full Stack Developer, April 2022 to present, remote
   - NAPA Auto Parts, Software Engineer, January to February 2022
   - ACI Services, Software Engineer (Contract), January 2019 to February 2021
   - NAPA Auto Parts, Store Manager, April 2014 to April 2022, shown as a
     compact "before software" entry
4. **Skills**, four curated groups (roughly 25 items total):
   - Frontend: Vue 3, TypeScript, JavaScript, React, HTML/CSS, Web Components (Vue compiled custom elements), Lottie
   - Backend: .NET / C#, Node.js, REST APIs, MVC
   - Data and Cloud: MongoDB, MySQL, SQL Server, Firebase, AWS, AWS CodePipeline, Bitbucket Pipelines
   - Practices: Git, Agile, unit testing, analytics integration, SDK onboarding and intern training, MLR-compliant pharma tooling
5. **About**: three short paragraphs. Self-taught; shipped paid software for
   local businesses (ACI, NAPA) before going full-time; now platform work at
   StorySoft. The old "How I learned programming" (Treehouse, freeCodeCamp,
   Udemy) section is removed.
6. **Contact**: email, LinkedIn, GitHub, resume download. Plain links, no icon
   grid.

### 3.3 Case studies

Every case study page has the same shape: title, one-line summary, meta row
(Role · Employer · Year · Stack tags), hero image or live embed, then sections
**Problem**, **What I built**, **Outcome**, and a **Links** row where
applicable. Previous / next navigation cycles through all six in order. A back
link returns to the home page's work section.

| Slug | Title | Media | Notes |
|---|---|---|---|
| `story-builder` | Story Builder | Builder screenshot (`Screenshot 2026-09-04 142339.png`) | Drag-and-drop editor agencies use to design responsive pharma ads without a developer: element palette (rich text, image, video, audio, gradient, shape, Lottie), layers panel, positioning and typography controls, multi-page stories, undo/redo, cloud save, preview, export, and pharma compliance features (ISI Editor, Reference Modal). Chris built the Lottie player Vue component and the analytics integration inside the Builder. Built with Vue. |
| `webframe` | Webframe | Gallery screenshot (`webframe-embed.png`) plus a live `<storysoft-webframe>` embed | Config-driven custom element (Vue compiled to a custom element) that a client drops on any page. Fetches a per-client JSON config from the arc config service, renders a filterable gallery of Stories with thumbnails and category filters, supports Google Analytics integration, visit tracking, and campaign attribution. |
| `player` | Player | Open-lightbox screenshot (`Webframe-open.png`) plus a live `<storysoft-player>` embed | Embeddable custom element that loads a Story in-frame, preserves aspect ratio, hides until loaded, and reports analytics. Multi-page navigation, share and favorite actions, prescribing-information bar. |
| `napa-invoices` | NAPA Invoices | Existing three screenshots | Existing copy tightened. Python OCR pipeline (pytesseract, pyimage) renames scanned invoices; React + Firebase portal with authenticated upload and customer lookup. Keeps links to repo, live site, and Python repo. |
| `aci-tag-printer` | ACI Tag Printer | Existing three screenshots | Existing copy tightened. jQuery/HTML/JS front end with Java for SQL queries; techs place text boxes over a tag image and save print templates to the database. |
| `aci-oem-quoting` | ACI OEM Quoting | No screenshot (NDA); typographic hero card instead | Existing copy tightened. ASP.NET MVC site aggregating cost and margin data across databases; quote time dropped from days to hours. NDA note kept. |

StorySoft copy stays at the level approved: what the tool does, what Chris
built, technologies used. No internal architecture.

### 3.4 Live embeds

Both scripts are public ES modules on public.storysoft.io and were verified
reachable on 2026-09-04:

```html
<script type="module" src="https://public.storysoft.io/static/@storysoft/storysoft-player/latest/storysoftPlayer.es.js"></script>
<script type="module" src="https://public.storysoft.io/static/@storysoft/storysoft-webframe/latest/storysoftWebframe.es.js"></script>
```

Usage on the portfolio:

```html
<storysoft-webframe client-name="storysoft" webframe-id="examples_page_hcp"
  campaign="sitewf" track-visits="" gtag-integration="true"
  api-url-format="https://arc.storysoft.io/webframe/configs/${clientName}/${configName}">
</storysoft-webframe>

<storysoft-player embed="true" hide-until-loaded="true" preserve-ratio="true"
  source="https://demos.storysoft.io/nuulife/?campaign=sitewf" gtag-integration="true"
  style="display:block;width:100%;max-width:375px;">
</storysoft-player>
```

If a script fails to load, the page shows the static screenshot in its place
and a short note; the case study never renders an empty box.

## 4. Architecture

### 4.1 Project layout

```
index.html
vite.config.ts
netlify.toml                      # build command, publish dir, SPA redirect
public/
  Chris_Janke_Resume.pdf          # generated from resume/resume.html
  favicon.svg
resume/
  resume.html                     # resume source, print stylesheet inline
  build-pdf.ps1                   # headless Edge -> public/Chris_Janke_Resume.pdf
src/
  main.ts                         # createApp, router, custom element config
  App.vue
  router.ts
  styles/
    tokens.css                    # colors, type scale, spacing, breakpoints
    base.css                      # reset, body, typography
  content/
    projects.ts                   # Project[] (typed), source of truth for cards + case studies
    experience.ts                 # Experience[]
    skills.ts                     # SkillGroup[]
    profile.ts                    # name, title, pitch, links
  assets/
    projects/                     # screenshots (existing + new StorySoft)
  components/
    SiteHeader.vue
    SiteFooter.vue
    HeroSection.vue
    ProjectCard.vue
    ProjectGrid.vue
    ExperienceTimeline.vue
    SkillGroups.vue
    AboutSection.vue
    ContactSection.vue
    StackTags.vue
    StorySoftEmbed.vue            # renders <storysoft-*>, loads script once, fallback image
  pages/
    HomePage.vue
    CaseStudyPage.vue
  __tests__/
    projects.test.ts
    HomePage.test.ts
    CaseStudyPage.test.ts
```

### 4.2 Content model

```ts
export interface ProjectLink { label: string; href: string }
export interface ProjectSection { heading: 'Problem' | 'What I built' | 'Outcome'; paragraphs: string[] }
export interface ProjectEmbed {
  kind: 'webframe' | 'player'
  attrs: Record<string, string>
}
export interface Project {
  slug: string
  title: string
  summary: string          // one line, used on card and case-study header
  employer: string
  role: string
  year: string             // e.g. "2022–present"
  stack: string[]
  thumbnail: string        // imported asset URL
  images: { src: string; alt: string }[]
  embed?: ProjectEmbed
  sections: ProjectSection[]
  links?: ProjectLink[]
  nda?: boolean
}
```

`projects.ts` exports `projects: Project[]` in display order and a helper
`getProject(slug)`. Home grid and case-study page both read from it.

### 4.3 Routing

| Path | Page | Notes |
|---|---|---|
| `/` | HomePage | Anchors `#work`, `#experience`, `#about`, `#contact` |
| `/work/:slug` | CaseStudyPage | Unknown slug redirects to `/` |
| `/:pathMatch(.*)*` | redirect `/` | |

Scroll behavior: scroll to top on route change, honor hash anchors on the home
page.

### 4.4 Custom elements

`main.ts` sets `app.config.compilerOptions.isCustomElement = tag => tag.startsWith('storysoft-')`
(mirrored in `vite.config.ts` for the SFC compiler). `StorySoftEmbed.vue`
injects the matching module script into `document.head` once per kind, renders
the element with the attrs from the content model, and swaps in the fallback
image if the script errors or the element has not upgraded within a timeout.

### 4.5 Styling

- `tokens.css` defines: `--bg`, `--bg-elevated`, `--text`, `--text-muted`,
  `--accent`, `--accent-soft`, `--border`, type scale, spacing scale, radii,
  one content max-width, and breakpoints at 640px and 1024px.
- Fonts: one serif display face for headlines, one sans for body, one
  monospace for labels and tags, loaded from Google Fonts with system
  fallbacks.
- Mobile first. The project grid is one column under 640px, two up to 1024px,
  three above.
- Motion is limited to hover states and one fade on route change; respects
  `prefers-reduced-motion`.
- The frontend-design skill is loaded during implementation to keep the result
  from reading as a template.

### 4.6 Build and deploy

- `npm run dev`, `npm run build` (runs `vue-tsc --noEmit` then `vite build`),
  `npm run test`, `npm run preview`.
- `netlify.toml`: build `npm run build`, publish `dist`, redirect
  `/* -> /index.html 200`.
- Work happens on a feature branch; the user merges to `master` to deploy.

## 5. Resume

Authored in `resume/resume.html` with an inline print stylesheet, one page at
US Letter. `resume/build-pdf.ps1` runs headless Edge
(`msedge --headless --print-to-pdf`) to write `public/Chris_Janke_Resume.pdf`.
The PDF is committed so Netlify serves it without a build step.

Content:

- **Header**: Chris Janke · Full Stack Developer · Cambridge, OH · phone ·
  email · jankrodev.netlify.app · github.com/JankroDev · LinkedIn
- **Summary**: three sentences leading with StorySoft platform work (editor,
  embeddable player and webframe custom elements, analytics), then full-stack
  range (.NET/C#, Vue, MongoDB/MySQL, AWS), then the track record of shipping
  paid software for businesses since 2019.
- **Experience**:
  - StorySoft LLC, Full Stack Developer, April 2022 to present, remote. Five or
    six bullets: Builder features (Lottie player component, analytics
    integration), Webframe and Player custom elements, .NET/C# and
    MongoDB/MySQL backend work, AWS CodePipeline and Bitbucket Pipelines,
    bug-ticket ownership, intern SDK training.
  - NAPA Auto Parts, Software Engineer, January to February 2022. Invoice
    portal: Python OCR pipeline, React, Firebase.
  - ACI Services, Software Engineer (Contract), January 2019 to February 2021.
    Tag printer tool; OEM quoting MVC site, quote time from days to hours.
  - NAPA Auto Parts, Store Manager, April 2014 to April 2022. One line.
- **Skills**: same four groups as the site, about 25 items.
- No Education section. "Authorized to work in the US for any employer" kept
  as a footer line.

Measurable claims are only included where Chris has confirmed them; otherwise
bullets describe scope and responsibility.

## 6. Testing

- `projects.test.ts`: every project has a unique slug, non-empty summary,
  at least one image or an embed, and all three sections; `getProject`
  returns undefined for unknown slugs.
- `HomePage.test.ts`: renders one ProjectCard per project, cards link to
  `/work/<slug>`, hero contains the title "Full Stack Developer" and never the
  string "Jr".
- `CaseStudyPage.test.ts`: renders title, meta row, all sections, previous /
  next links for first, middle, and last projects; unknown slug redirects.
- `StorySoftEmbed` is tested for the fallback path only (script error shows
  the image); the live path is checked manually in the browser.
- `npm run build` must succeed with zero type errors before any commit that
  claims completion.

## 7. Out of scope

- Blog, CMS, or contact form.
- Dark/light theme toggle (the site is dark only).
- Analytics on the portfolio itself.
- Custom domain.
- Any StorySoft source code or internal architecture.

## 8. Open items for implementation

- Copy any new StorySoft screenshots from `C:\Users\Cjank\Pictures\Screenshots`
  and `C:\Users\Cjank\Downloads` into `src/assets/projects` at the start of
  implementation.
- Chris reviews all StorySoft copy and the resume bullets before merge.
