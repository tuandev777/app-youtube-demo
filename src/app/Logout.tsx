"use client"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"

export default function Logout() {
  //   const { data: session, status } = useSession()
  //   console.log("🚀 ~ Logout ~ session:", session)
  return <Button onClick={() => signOut()}>Sign out</Button>
}
