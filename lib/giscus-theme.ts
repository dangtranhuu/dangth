export const updateGiscusTheme = (newTheme: string) => {
  const tryPostTheme = () => {
    const iframe = document.querySelector('iframe.giscus-frame') as HTMLIFrameElement | null
    if (!iframe?.contentWindow) return false

    iframe.contentWindow.postMessage(
      {
        giscus: {
          setConfig: {
            theme: newTheme,
          },
        },
      },
      'https://giscus.app'
    )
    return true
  }

  // Retry gửi postMessage đến khi iframe load xong
  const interval = setInterval(() => {
    const success = tryPostTheme()
    if (success) clearInterval(interval)
  }, 300)
}
