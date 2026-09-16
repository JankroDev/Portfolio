import type { Profile } from './types'

export const profile: Profile = {
  name: 'Chris Janke',
  title: 'Full Stack Developer',
  headline: 'Software people use every day.',
  pitch:
    'Full stack developer who spent four years at Storysoft building the story editor, embeddable player, and analytics that healthcare marketing agencies run on. Before that, custom business software for NAPA Auto Parts and ACI Services.',
  email: 'jankrodev@gmail.com',
  github: 'https://github.com/JankroDev',
  linkedin: 'https://www.linkedin.com/in/chris-janke-b58a76231/',
  resumeUrl: '/Chris_Janke_Resume.pdf',
  repoUrl: 'https://github.com/JankroDev/Portfolio',
  about: [
    'I am a self-taught developer based in Cambridge, Ohio. I learned by building, and the projects that taught me the most were the ones a paying customer depended on, where every feature request had to ship.',
    'From 2019 to 2022 I built custom software for businesses in my area: a tag-printing tool and an OEM quoting system for ACI Services, and an invoice portal with an OCR pipeline for a group of NAPA Auto Parts stores. Each of those is still in use.',
    'From 2022 to 2026 I was a full stack developer at Storysoft, working on the Story Builder editor, the embeddable Webframe and Player custom elements, and the analytics that connect them, on a Vue, TypeScript, .NET, and AWS stack.',
  ],
}
