import { renderToPipeableStream } from 'react-dom/server'
import { Response } from 'express'
import { Writable } from 'stream'
import { StaticRouter } from '../lib'
import App from './App'

class HtmlWritable extends Writable {
  private chunks: any[] = []
  private html: string = ''

  getHtml(): string {
    return this.html
  }
  _write(chunk: any, _encoding: BufferEncoding, callback: (error?: Error | null) => void): void {
    this.chunks.push(chunk)
    callback()
  }
  _final(callback: (error?: Error | null) => void): void {
    this.html = Buffer.concat(this.chunks).toString()
    callback()
  }
}

export function render(url: string, res: Response, template: string) {
  const writable = new HtmlWritable()

  writable.on('finish', () => {
    const html = template
      .replace('<!--app-head-->', '<script>window.__SSR__=true</script>')
      .replace('<!--app-html-->', writable.getHtml())
    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  })

  const stream = renderToPipeableStream(
    <StaticRouter url={url}>
      <App />
    </StaticRouter>,
    {
      onShellReady() {
        stream.pipe(writable)
      }
    }
  )
}
