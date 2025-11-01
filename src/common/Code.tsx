import { useEffect } from 'react'
import { createHighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'
import { useProxy } from '../../lib'

const highlighterPromise = createHighlighterCore({
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

  const state = useProxy({ html: '' })

  useEffect(() => {
    if (children) {
      highlighterPromise.then((highlighter) => {
        state.html = highlighter.codeToHtml(children.trim(), { lang, theme: 'dark-plus' })
      })
    }
  }, [children])

  return state.html ? (
    <div dangerouslySetInnerHTML={{ __html: state.html }}></div>
  ) : (
    <pre style={{ visibility: 'hidden' }}>
      <code>
        {children?.trim()}
      </code>
    </pre>
  )
}

export default Code
