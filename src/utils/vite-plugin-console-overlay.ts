// 控制台覆盖层的 HTML 结构
const createOverlayHTML = () => `
  <div id="console-overlay" style="position: fixed; top: 40px; right: 12px; max-height: 500px; max-width: 400px; overflow-y: auto; background: rgba(0, 0, 0, 0.8); color: white; padding: 10px; border-radius: 4px; font-family: monospace; z-index: 9999;"></div>
`

// 控制台重写的主函数
function initConsoleOverlay() {
  const overlay = document.getElementById('console-overlay')
  type ConsoleMethods = 'log' | 'warn' | 'error' | 'info'

  const originalConsole: Record<ConsoleMethods, (...args: unknown[]) => void> = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
  }

  const createLogEntry = (type: keyof typeof originalConsole, args: unknown[]) => {
    const entry = document.createElement('div')
    entry.style.borderBottom = '1px solid #444'
    entry.style.padding = '4px 0'

    // entry.innerHTML = `[${type}] ${Array.from(args)
    //   .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg)))
    //   .join(' ')}`
    const d = document.createElement('details')
    const s = document.createElement('summary')
    s.innerHTML = `${type}`
    d.appendChild(s)
    const p = document.createElement('p')
    p.innerHTML = `${Array.from(args)
      .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg)))
      .join(' ')}`
    d.appendChild(p)
    entry.appendChild(d)
    return entry
  }

  ;(['log', 'warn', 'error', 'info'] as ConsoleMethods[]).forEach((type) => {
    if (type in originalConsole) {
      console[type] = function (...args: unknown[]) {
        originalConsole[type].apply(console, args) // 调用原始方法
        if (overlay) {
          overlay.appendChild(createLogEntry(type, args)) // 添加日志到 overlay
          overlay.scrollTop = overlay.scrollHeight // 滚动到底部
        }
      }
    }
  })
}

export default function vitePluginConsoleOverlay() {
  return {
    name: 'vite-plugin-console-overlay',
    transformIndexHtml(html: string) {
      const injection = `
        ${createOverlayHTML()}
        <script>(${initConsoleOverlay.toString()})();</script>
      `

      return html.replace('</body>', `${injection}</body>`)
    },
  }
}
