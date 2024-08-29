import { Button } from "@/components/ui/button"
import { API_URL, CHANNEL_ID, KEY_YOUTUBE, PLAYLIST_ID, URL_YOUTUBE } from "@/config"
import { signOut, useSession } from "next-auth/react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
const getData = async () => {
  const params = new URLSearchParams({
    part: "snippet,contentDetails",
    key: KEY_YOUTUBE,
    channelId: CHANNEL_ID,
  }).toString()
  const res = await fetch(URL_YOUTUBE + "activities?" + params)
  const data = await res.json()
  return data
}
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { id: string }
}>) {
  console.log("🚀 ~ id:", params.id)
  const data = await getData()
  const listVideo = data?.items || []
  return (
    <div className="mt-4">
      {/* <p>{JSON.stringify(listVideo)}</p> */}
      <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {listVideo?.map((item: any) => (
          <Card key={item?.id}>
            <CardHeader>
              <Image
                src={item?.snippet?.thumbnails?.standard?.url}
                height={item?.snippet?.thumbnails?.standard?.height}
                width={item?.snippet?.thumbnails?.standard?.width}
                alt={item?.snippet?.title}
              />
              <CardTitle>{item?.snippet?.title}</CardTitle>
              <CardDescription>{item?.snippet?.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/video/${item?.contentDetails?.upload?.videoId}`}>
                <Button>Comment</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      {children}
    </div>
  )
}
