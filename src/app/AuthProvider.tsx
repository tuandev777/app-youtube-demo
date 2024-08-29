"use client"
import { Button } from "@/components/ui/button"
import { SessionProvider, signOut, useSession } from "next-auth/react"
import { useEffect } from "react"

export default function AuthProvider({ children }) {
  //   const { data: session, status } = useSession()
  //   console.log("🚀 ~ Logout ~ session:", session)

  return <SessionProvider>{children}</SessionProvider>
}
