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
        style: 'display:block;width:100%;max-width:375px;margin-inline:auto;aspect-ratio:9/16;',
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
