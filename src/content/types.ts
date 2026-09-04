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
