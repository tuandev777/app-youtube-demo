import { Button } from "@/components/ui/button"
import { InputComment } from "./InputComment"
import { KEY_YOUTUBE, PLAYLIST_ID, URL_YOUTUBE } from "@/config"
import Image from "next/image"
import ListComment from "./ListComment"

const getData = async (id: any) => {
  const params = new URLSearchParams({
    part: "snippet",
    key: KEY_YOUTUBE,
    videoId: id,
  }).toString()
  const res = await fetch(URL_YOUTUBE + "commentThreads?" + params, {
    // cache: "no-store",
    next: { tags: ["commentThreads"] },
  })
  const data = await res.json()
  return data
}
export default async function Video({ params }: { params: { id: string; space: string } }) {
  const data = await getData(params?.id)
  const listComment = data?.items || []
  return (
    <>
      <InputComment videoId={params?.id} />
      <div className="max-w-2xl ">
        <ListComment data={listComment} />
      </div>
      {/* <div className="max-w-2xl mx-auto">
        <div className="mt-4">
          <div className="flex items-start space-x-4 p-4 border-b">
            <img
              src="https://via.placeholder.com/40"
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">Username</h4>
                <span className="text-xs text-gray-500">2 days ago</span>
              </div>
              <p className="text-sm text-gray-800 mt-1">
                This is a comment text, giving an example of how YouTube comments might look.
              </p>
              <div className="flex items-center space-x-4 mt-2">
                <button className="text-sm text-blue-500 hover:underline">Like</button>
                <button className="text-sm text-blue-500 hover:underline">Reply</button>
                <button className="text-sm text-blue-500 hover:underline replies-toggle">
                  Replies
                </button>
              </div>

            
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}
