import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "./theme-config.css"

import { Container, Theme } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"
import { Toaster } from "react-hot-toast"
import QueryClientProvider from "./QueryClientProvider"
import AuthProvider from "./auth/Provider"
import Navbar from "./navbar"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Created by Guillem Martinez",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Toaster />
        <QueryClientProvider>
          <AuthProvider>
            <Theme appearance="light" accentColor="violet">
              <Navbar />
              <main className="p-5">
                <Container>{children}</Container>
              </main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
