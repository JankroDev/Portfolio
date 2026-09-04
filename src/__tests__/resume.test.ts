import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath, URL as FileURL } from 'node:url'

const root = fileURLToPath(new FileURL('../../', import.meta.url))

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
