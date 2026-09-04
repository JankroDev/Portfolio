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
