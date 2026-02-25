import Script from "next/script"

const tidioKey = process.env.NEXT_PUBLIC_TIDIO_PUBLIC_KEY

export function ChatWidget() {
  if (!tidioKey) {
    return null
  }

  return (
    <Script
      id="tidio-chat"
      src={`https://code.tidio.co/${tidioKey}.js`}
      strategy="afterInteractive"
    />
  )
}
