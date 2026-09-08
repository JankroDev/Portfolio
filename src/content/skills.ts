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
    name: 'AI Tools',
    items: [
      'Claude / Claude Code',
      'ChatGPT',
      'GitHub Copilot',
      'AI-assisted code generation',
      'Prompt engineering',
    ],
  },
  {
    name: 'Practices',
    items: ['Git', 'Agile', 'Unit testing', 'Analytics integration', 'SDK onboarding & intern training', 'MLR-compliant pharma tooling'],
  },
]
