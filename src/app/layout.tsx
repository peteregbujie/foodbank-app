import "./global.css"

import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { Inter } from "next/font/google"

import SessionProvider from "@/components/SessionProvider"

import Navbar from "@/components/Navbar"
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
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
