"use client"
import { actionDeleteComment } from "@/app/action"
import { KEY_YOUTUBE, URL_YOUTUBE } from "@/config"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { Fragment, useState } from "react"
function timeAgo(date) {
  const now = new Date()
  const past = new Date(date)
  const diffInSeconds = Math.floor((now - past) / 1000)

  const secondsInMinute = 60
  const secondsInHour = 60 * secondsInMinute
  const secondsInDay = 24 * secondsInHour

  if (diffInSeconds < secondsInMinute) {
    return `${diffInSeconds} seconds ago`
  } else if (diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute)
    return `${minutes} minutes ago`
  } else if (diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour)
    return `${hours} hours ago`
  } else {
    const days = Math.floor(diffInSeconds / secondsInDay)
    return `${days} days ago`
  }
}
export default function ListComment({ data }: { data: any[] }) {
  const { data: session, status } = useSession()
  console.log("🚀 ~ Logout ~ session:", session)
  const [dataReply, setDataReply] = useState({})
  const handleClickReply = async (id: any, isShow: boolean) => {
    const params = new URLSearchParams({
      part: "snippet",
      //   key: KEY_YOUTUBE,
      parentId: id,
    }).toString()
    const res = await fetch(URL_YOUTUBE + "comments?" + params, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })
    const data = await res.json()
    console.log("🚀 ~ handleClickReply ~ data:", data)
    setDataReply({ ...dataReply, [id]: { isShow: isShow ? false : true, data: data?.items } })
  }

  const handleDeleteComment = async (id: any) => {
    await actionDeleteComment(id)
  }
  return (
    <div className="mt-4">
      {data?.map((item) => (
        <Fragment key={item?.id}>
          <div className="flex items-start space-x-4 p-4 ">
            <Image
              src={item?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl}
              alt="Avatar"
              className="w-10 h-10 rounded-full"
              width={50}
              height={50}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">
                  {item?.snippet?.topLevelComment?.snippet?.authorDisplayName}
                </h4>
                <span className="text-xs text-gray-500">
                  {timeAgo(item?.snippet?.topLevelComment?.snippet?.publishedAt)}
                </span>
              </div>
              <p className="text-sm text-gray-800 mt-1 text-left">
                {item?.snippet?.topLevelComment?.snippet?.textDisplay}
              </p>
              <div className="flex items-center space-x-4 mt-2 justify-between">
                <button className="text-sm text-blue-500 hover:underline">Reply</button>
                <button
                  onClick={() => handleDeleteComment(item?.snippet?.topLevelComment?.id)}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          {item?.snippet?.totalReplyCount ? (
            <p
              onClick={() =>
                handleClickReply(
                  item?.snippet?.topLevelComment?.id,
                  dataReply?.[item?.snippet?.topLevelComment?.id]?.isShow
                )
              }
              className="text-sm text-blue-500 hover:underline cursor-pointer"
            >
              {`${dataReply?.[item?.snippet?.topLevelComment?.id]?.isShow ? "Hide" : "Show"} `}{" "}
              {item?.snippet?.totalReplyCount} reply
            </p>
          ) : null}

          {dataReply[item?.snippet?.topLevelComment?.id]?.isShow
            ? dataReply[item?.snippet?.topLevelComment?.id]?.data?.map((itemChild) => (
                <div key={itemChild?.id} className="replies  mt-1 ml-8">
                  <div className="flex items-start space-x-4 p-2 ">
                    <Image
                      src={itemChild?.snippet?.authorProfileImageUrl}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full"
                      width={50}
                      height={50}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">
                          {itemChild?.snippet?.authorDisplayName}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {timeAgo(itemChild?.snippet?.publishedAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-800 mt-1 text-left">
                        {itemChild?.snippet?.textDisplay}
                      </p>
                      {/* <div className="flex items-center space-x-4 mt-2">
                  <button className="text-sm text-blue-500 hover:underline">Like</button>
                  <button className="text-sm text-blue-500 hover:underline">Reply</button>
                </div> */}
                    </div>
                  </div>
                </div>
              ))
            : null}
        </Fragment>
      ))}
    </div>
  )
}
