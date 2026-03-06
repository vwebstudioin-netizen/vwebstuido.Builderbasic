import type { Metadata } from 'next'
import { Montserrat, Inter } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Reddy Constructions | Builders & Contractors',
  description:
    'Trusted builders and contractors delivering quality residential, commercial, and renovation projects. Get a free site visit today.',
  keywords: [
    'builders',
    'contractors',
    'construction',
    'renovation',
    'interior design',
    'civil work',
    'residential construction',
    'commercial construction',
  ],
  openGraph: {
    title: 'Reddy Constructions | Builders & Contractors',
    description:
      'Trusted builders and contractors delivering quality residential, commercial, and renovation projects.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
