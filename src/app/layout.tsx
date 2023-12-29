import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local'


const font2 = localFont({
  src: '../font/Michroma-Regular.ttf',
  display: 'swap'
})
export const metadata: Metadata = {
  title: 'ActiveOrange',
  description: 'A Simple Orange fitness tracker for your fitness  needs',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth', maxWidth: '100vw' }}>
      <body className={font2.className}>{children}</body>
    </html>

  )
}
