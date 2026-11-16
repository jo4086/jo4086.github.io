import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { chromium } from '@playwright/test'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { parse } from 'yaml'

const slug = process.argv[2]
if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  throw new Error('Usage: node scripts/export-post-pdf.mjs <post-slug>')
}

const root = path.resolve(import.meta.dirname, '..')
const raw = await readFile(path.join(root, 'src/content/posts', `${slug}.md`), 'utf8')
const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw)
if (!match) throw new Error(`${slug}: frontmatter is missing`)

const metadata = parse(match[1])
if (!metadata?.pdf || !/^\/[a-z0-9-]+\.pdf$/.test(metadata.pdf)) {
  throw new Error(`${slug}: frontmatter pdf must be a public root PDF path`)
}

const body = raw.slice(match[0].length).trim()
const components = {
  img: ({ src, alt }) => {
    if (!src?.startsWith('/diagrams/') || !src.endsWith('.svg')) {
      throw new Error(`${slug}: unsupported image path ${src}`)
    }
    return React.createElement('img', { src: path.join(root, 'public', src), alt })
  },
  a: ({ href, children }) =>
    React.createElement(
      'a',
      { href: href?.startsWith('/#/') ? `https://jo4086.github.io${href}` : href },
      children,
    ),
}
let content = renderToStaticMarkup(
  React.createElement(Markdown, { remarkPlugins: [remarkGfm], components, children: body }),
)

const imageSources = [...content.matchAll(/src="([^"]+\.svg)"/g)].map((match) => match[1])
for (const imageSource of imageSources) {
  const svg = await readFile(imageSource)
  content = content.replace(
    `src="${imageSource}"`,
    `src="data:image/svg+xml;base64,${svg.toString('base64')}"`,
  )
}

function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

const articleUrl = `https://jo4086.github.io/#/blog/${slug}`
const html = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><title>${escapeHtml(metadata.title)}</title>
<style>
@page { size: A4; margin: 16mm 17mm; }
* { box-sizing: border-box; }
body { margin: 0; color: #21364c; font-family: "Noto Sans CJK KR", "Noto Sans KR", "Malgun Gothic", sans-serif; font-size: 11pt; line-height: 1.65; }
header { border-bottom: 2px solid #b8ccdc; padding-bottom: 15px; margin-bottom: 18px; }
.eyebrow { margin: 0 0 9px; color: #386a86; font-size: 9pt; font-weight: 700; }
h1 { margin: 0 0 8px; font-size: 24pt; line-height: 1.25; letter-spacing: -0.035em; }
.summary { margin: 0 0 9px; color: #526b82; font-size: 10.5pt; }
.source { font-size: 8.5pt; word-break: break-all; }
h2 { margin: 28px 0 10px; border-top: 1px solid #d5e0e8; padding-top: 13px; font-size: 16pt; line-height: 1.35; break-after: avoid; }
h3 { margin: 20px 0 8px; font-size: 12.5pt; break-after: avoid; }
p, ul, ol { margin: 0 0 13px; orphans: 3; widows: 3; }
ul, ol { padding-left: 22px; }
li { margin: 4px 0; }
img { display: block; max-width: 100%; max-height: 225mm; width: auto; height: auto; margin: 15px auto 8px; break-inside: avoid; }
table { width: 100%; border-collapse: collapse; margin: 14px 0; font-size: 9.5pt; break-inside: avoid; }
th, td { border: 1px solid #c8d7e0; padding: 7px 9px; text-align: left; vertical-align: top; }
th { background: #edf4f8; }
a { color: #215f83; text-decoration: underline; }
code { font-family: monospace; font-size: .9em; background: #edf4f8; padding: 1px 3px; }
</style></head><body>
<header><p class="eyebrow">${escapeHtml(metadata.category)} · ${escapeHtml(metadata.date)} · jo4086</p>
<h1>${escapeHtml(metadata.title)}</h1><p class="summary">${escapeHtml(metadata.summary)}</p>
<a class="source" href="${articleUrl}">${articleUrl}</a></header>
<main>${content}</main></body></html>`

const browser = await chromium.launch()
try {
  const page = await browser.newPage()
  await page.setContent(html, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  if (process.env.POST_PDF_PREVIEW_PATH) {
    await page.emulateMedia({ media: 'print' })
    await page.screenshot({ path: process.env.POST_PDF_PREVIEW_PATH, fullPage: true })
  }
  const output = path.join(root, 'public', metadata.pdf.slice(1))
  await page.pdf({
    path: output,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    tagged: true,
  })
  console.log(output)
} finally {
  await browser.close()
}
