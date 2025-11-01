import fs from 'fs/promises'
import express from 'express'

const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

const templateHtml = isProduction ?
  await fs.readFile('./dist/src/index.html', 'utf-8') : ''

const app = express()

let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/src', { extensions: [] }))
}

app.use('*all', async (req, res) => {
  try {
    let url = req.originalUrl
    if (!url.startsWith(base)) {
      res.status(404).end()
      return
    }
    url = url.replace(base, '')
    let template, render
    if (!isProduction) {
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/ssr.tsx')).render
    } else {
      template = templateHtml
      render = (await import('./dist/ssr/index.js')).render
    }
    await render(url, res, template)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.error(e.stack)
    res.status(500).end(e.stack)
  }
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
