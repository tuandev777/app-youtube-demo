import { getUserSession } from "@/lib/session"
import Image from "next/image"
import Logout from "./Logout"
import Reports from "./Reports"

export default async function Home() {
  return (
    <>
      <Reports />
    </>
  )
}
