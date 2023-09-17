import "./global.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { getServerSession } from "next-auth"

import SessionProvider from "@/components/SessionProvider"

import ToasterContext from "./context/ToasterContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Food Bank App",
  description: "Find Food Banks Near You",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ToasterContext />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
