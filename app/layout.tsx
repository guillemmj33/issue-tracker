import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "./navbar"
import { Theme } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Created by Guillem",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          <Navbar />
          <main className="p-5">{children}</main>
        </Theme>
      </body>
    </html>
  )
}
