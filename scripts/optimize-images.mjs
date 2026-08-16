/**
 * Convert public PNG rasters to resized WebP.
 * Run: npm run optimize:images
 *
 * Future drops: put PNG/JPG next to the intended folder, then re-run.
 * Keep SVG icons as SVG. Product videos stay MP4/WebM (see docs/handbook.md).
 */
import { readdir, stat, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const imagesDir = path.join(rootDir, 'public', 'images')
const deletePng = process.env.KEEP_PNG !== '1'

function maxWidthFor(relPosix) {
  if (/\/DTS\.png$/i.test(relPosix)) return 320
  if (/\/Products\/.+-logo\.png$/i.test(relPosix)) return 640
  if (/\/partners\//i.test(relPosix)) return 900
  if (/\/clients\//i.test(relPosix)) return 480
  if (/\/services\//i.test(relPosix)) return 640
  return 1200
}

async function walkPng(dir, acc = []) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await walkPng(full, acc)
    } else if (/\.png$/i.test(entry.name)) {
      acc.push(full)
    }
  }
  return acc
}

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`
}

async function convertPng(file) {
  const rel = path.relative(imagesDir, file).split(path.sep).join('/')
  const maxWidth = maxWidthFor(`/${rel}`)
  const outFile = file.replace(/\.png$/i, '.webp')
  const input = sharp(file)
  const meta = await input.metadata()
  const width = meta.width || maxWidth
  const pipeline = width > maxWidth ? input.resize({ width: maxWidth, withoutEnlargement: true }) : input

  await pipeline
    .webp({ quality: 80, alphaQuality: 90, effort: 6 })
    .toFile(outFile)

  const before = (await stat(file)).size
  const after = (await stat(outFile)).size
  if (deletePng) await unlink(file)
  return { rel, before, after }
}

async function writeFavicon() {
  const sources = ['DTS.webp', 'DTS.png'].map((name) => path.join(imagesDir, name))
  let source = null
  for (const candidate of sources) {
    try {
      await stat(candidate)
      source = candidate
      break
    } catch {
      /* try next */
    }
  }
  if (!source) return null

  const favicon = path.join(rootDir, 'public', 'favicon.png')
  await sharp(source).resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png({ compressionLevel: 9 }).toFile(favicon)
  const apple = path.join(imagesDir, 'apple-touch.png')
  await sharp(source).resize(180, 180, { fit: 'contain', background: { r: 5, g: 10, b: 24, alpha: 1 } }).png({ compressionLevel: 9 }).toFile(apple)
  return { favicon, apple }
}

const files = await walkPng(imagesDir)
const rows = []
for (const file of files) {
  rows.push(await convertPng(file))
}

await writeFavicon()

const beforeTotal = rows.reduce((sum, row) => sum + row.before, 0)
const afterTotal = rows.reduce((sum, row) => sum + row.after, 0)

const report = [
  '# Image optimization report',
  '',
  '| File | Before | After |',
  '|------|--------|-------|',
  ...rows.map((row) => `| ${row.rel} | ${formatKb(row.before)} | ${formatKb(row.after)} |`),
  '',
  `Total: ${formatKb(beforeTotal)} → ${formatKb(afterTotal)}`,
  ''
].join('\n')

await writeFile(path.join(rootDir, 'scripts', 'image-optimize-report.md'), report)
console.log(report)
