import type React from "react"
import type {Metadata} from "next"
import {Inter} from "next/font/google"
import "../styles/globals.css"
import { Geist } from 'next/font/google'
import localFont from 'next/font/local';

const serephixBold = localFont({
  src: './font/SerephixBold.ttf',
  weight: '700',
  style: 'normal',
  variable: '--font-serephixbold',
});

const serephixNew = localFont({
  src: './font/SerephixRegular.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-serephixnew',
});

const geist = Geist({
  subsets: ['latin'],
})
const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "Soncresity Industries",
  description: "The official Website of Soncresity Industries",
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${serephixBold.variable} ${serephixNew.variable}`}
    >
    <body className={inter.className}>
      {children}
    </body>
    </html>
  )
}
