import { useEffect, useState } from 'react'
import { createHighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

const highlighter = await createHighlighterCore({
  themes: [
    import('@shikijs/themes/dark-plus')
  ],
  langs: [
    import('@shikijs/langs/bash'),
    import('@shikijs/langs/tsx')
  ],
  engine: createOnigurumaEngine(import('shiki/wasm'))
})

type CodeProps = {
  lang?: 'bash' | 'tsx'
  children?: string
}

function Code(props: CodeProps) {
  const {
    lang = 'tsx',
    children
  } = props

  const [html, setHtml] = useState('')

  useEffect(() => {
    (async () => {
      if (children) {
        const html = highlighter.codeToHtml(children.trim(), { lang, theme: 'dark-plus' })
        setHtml(html)
      }
    })()
  }, [children])

  return html ? (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  ) : (
    <pre style={{ visibility: 'hidden' }}>
      <code>
        {children?.trim()}
      </code>
    </pre>
  )
}

export default Code
