import { parse } from 'yaml'

export interface Post {
  slug: string
  title: string
  date: string
  summary: string
  category: string
  tags: string[]
  body: string
  relatedProjectSlugs: string[]
}

export interface CategoryNode {
  label: string
  path: string
  count: number
  children: CategoryNode[]
}

export interface Heading {
  id: string
  title: string
  level: 2 | 3
  line: number
}

const sources = import.meta.glob<string>('../../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readString(value: unknown, field: string, source: string): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${source}: ${field} must be a non-empty string`)
  }
  return value.trim()
}

function readStrings(value: unknown, field: string, source: string): string[] {
  if (!Array.isArray(value) || !value.every((item) => typeof item === 'string')) {
    throw new Error(`${source}: ${field} must be a string array`)
  }
  return value.map((item: string) => item.trim()).filter(Boolean)
}

function parsePost(source: string, raw: string): Post {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw)
  if (!match) throw new Error(`${source}: frontmatter is missing`)

  const metadata: unknown = parse(match[1])
  if (!isRecord(metadata)) throw new Error(`${source}: frontmatter must be an object`)

  const date = readString(metadata.date, 'date', source)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`${source}: date must use YYYY-MM-DD`)
  }

  return {
    slug: readString(metadata.slug, 'slug', source),
    title: readString(metadata.title, 'title', source),
    date,
    summary: readString(metadata.summary, 'summary', source),
    category: readString(metadata.category, 'category', source),
    tags: readStrings(metadata.tags, 'tags', source),
    body: raw.slice(match[0].length).trim(),
    relatedProjectSlugs: metadata.relatedProjects
      ? readStrings(metadata.relatedProjects, 'relatedProjects', source)
      : [],
  }
}

export const posts = Object.entries(sources)
  .map(([source, raw]) => parsePost(source, raw))
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))

const slugs = posts.map((post) => post.slug)
if (new Set(slugs).size !== slugs.length) throw new Error('Post slugs must be unique')

export function getPost(slug: string | undefined): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getCategories(): CategoryNode[] {
  const roots: CategoryNode[] = []

  for (const post of posts) {
    const parts = post.category
      .split('/')
      .map((part) => part.trim())
      .filter(Boolean)
    let siblings = roots
    let path = ''

    for (const part of parts) {
      path = path ? `${path}/${part}` : part
      let node = siblings.find((item) => item.path === path)
      if (!node) {
        node = { label: part, path, count: 0, children: [] }
        siblings.push(node)
      }
      node.count += 1
      siblings = node.children
    }
  }

  return roots.sort((a, b) => a.label.localeCompare(b.label, 'ko'))
}

export function getTags(): Array<{ label: string; count: number }> {
  const counts = new Map<string, number>()
  for (const post of posts) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }
  return Array.from(counts, ([label, count]) => ({ label, count })).sort((a, b) =>
    a.label.localeCompare(b.label, 'ko'),
  )
}

export function getArchives(): Array<{ month: string; count: number }> {
  const counts = new Map<string, number>()
  for (const post of posts) {
    const month = post.date.slice(0, 7)
    counts.set(month, (counts.get(month) ?? 0) + 1)
  }
  return Array.from(counts, ([month, count]) => ({ month, count })).sort((a, b) =>
    b.month.localeCompare(a.month),
  )
}

function headingId(title: string): string {
  return title
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-|-$/g, '')
}

export function getHeadings(body: string): Heading[] {
  const seen = new Map<string, number>()
  let fence = ''
  return body.split('\n').flatMap((line, index) => {
    const fenceMatch = /^\s*(`{3,}|~{3,})/.exec(line)
    if (fenceMatch) {
      if (!fence) fence = fenceMatch[1][0]
      else if (fence === fenceMatch[1][0]) fence = ''
      return []
    }
    if (fence || /^ {4}/.test(line)) return []
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line)
    if (!match) return []
    const title = match[2].replace(/\s+#+$/, '')
    const base = headingId(title) || `heading-${index + 1}`
    const occurrence = seen.get(base) ?? 0
    seen.set(base, occurrence + 1)
    return [
      {
        id: occurrence ? `${base}-${occurrence + 1}` : base,
        title,
        level: match[1].length as 2 | 3,
        line: index + 1,
      },
    ]
  })
}
