import { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import type { Blockquote } from 'mdast'
import type { Node } from 'unist'

const SVG_TIP = `<svg class="octicon octicon-light-bulb" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>`
const SVG_WARNING = `<svg class="octicon octicon-alert mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>`
const SVG_INFO = `<svg class="octicon octicon-alert mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13 7.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-3 3.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v4.25h.75a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1 0-1.5h.75V12h-.75a.75.75 0 0 1-.75-.75Z"/><path d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1ZM2.5 12a9.5 9.5 0 0 0 9.5 9.5 9.5 9.5 0 0 0 9.5-9.5A9.5 9.5 0 0 0 12 2.5 9.5 9.5 0 0 0 2.5 12Z"/></svg>`
const SVG_ERROR = `<svg class="octicon octicon-alert mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1ZM5.834 19.227A9.464 9.464 0 0 0 12 21.5a9.5 9.5 0 0 0 9.5-9.5 9.464 9.464 0 0 0-2.273-6.166ZM2.5 12a9.464 9.464 0 0 0 2.273 6.166L18.166 4.773A9.463 9.463 0 0 0 12 2.5 9.5 9.5 0 0 0 2.5 12Z"/></svg>`

interface AdmonitionData {
  hName?: string
  hProperties?: {
    className?: string[]
    [key: string]: unknown
  }
}

const remarkAdmonition: Plugin = () => {
  return (tree: Node) => {
    visit(tree, 'blockquote', (node: Blockquote) => {
      const firstChild = node.children[0]
      if (
        firstChild &&
        firstChild.type === 'paragraph' &&
        firstChild.children[0]?.type === 'text'
      ) {
        const text = firstChild.children[0].value
        const match = text.match(/^\[\!(\w+)\]/)
        if (match) {
          const type = match[1].toLowerCase()
          const title = type

          firstChild.children[0].value = text.replace(/^\[\!\w+\]\s*/, '')

          let svgIcon = ''
          if (title === 'tip') svgIcon = SVG_TIP
          else if (title === 'info') svgIcon = SVG_INFO
          else if (title === 'warning') svgIcon = SVG_WARNING
          else if (title === 'error') svgIcon = SVG_ERROR

          node.children.unshift({
            type: 'html',
            value: `<div class="admonition-title ${title}">${svgIcon}</div>`
          });

          // HACK: mdast doesn't have `data`, but remark-rehype reads it
          (node as unknown as { data: AdmonitionData }).data = {
            hName: 'div',
            hProperties: {
              className: ['admonition', type],
            }
          }
        }
      }
    })
  }
}

export default remarkAdmonition
