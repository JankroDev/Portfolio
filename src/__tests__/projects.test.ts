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

  it('Storysoft embeds use the public custom elements', () => {
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
