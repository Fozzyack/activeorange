import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const roboto = Inter({subsets: ['latin'], display: 'swap' })

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
    <html lang="en" style={{scrollBehavior: 'smooth'}}>
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
