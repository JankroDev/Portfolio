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
  it('lists Storysoft first as current', () => {
    expect(experience[0].company).toBe('Storysoft LLC')
    expect(experience[0].end).toBe('Present')
  })

  it('has exactly one compact entry (Store Manager)', () => {
    const compact = experience.filter((e) => e.compact)
    expect(compact).toHaveLength(1)
    expect(compact[0].role).toBe('Store Manager')
  })
})

describe('skills', () => {
  it('has five groups with between 4 and 8 items each', () => {
    expect(skillGroups).toHaveLength(5)
    for (const g of skillGroups) {
      expect(g.items.length).toBeGreaterThanOrEqual(4)
      expect(g.items.length).toBeLessThanOrEqual(8)
    }
  })
})
