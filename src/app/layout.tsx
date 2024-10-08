import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Button } from "@/components/ui/button"
import { getUserSession } from "@/lib/session"
import Logout from "./Logout"
import Link from "next/link"
import AuthProvider from "./AuthProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getUserSession()
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <main className="text-center w-full mx-auto max-w-[1240px] mt-16">
            {/* <p>{JSON.stringify(user)}</p> */}
            <h1 className="text-4xl font-bold">Data Youtube</h1>
            {user?.name ? (
              <>
                <h3>Welcome {user?.name}</h3>
                <div className="flex flex-col justify-center items-center space-y-2">
                  <Button>
                    <Link href={"/video"}>Comment Video</Link>
                  </Button>
                  <Logout />
                </div>

                {children}
              </>
            ) : (
              <Button>
                <Link href={"/api/auth/signin"}>Login</Link>
              </Button>
            )}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
