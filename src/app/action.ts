"use server"

import { KEY_YOUTUBE, URL_YOUTUBE } from "@/config"
import { getUserSession } from "@/lib/session"
import { revalidateTag } from "next/cache"

export async function actionCreateComment(videoId: string, comment: string) {
  const session = await getUserSession()
  const params = new URLSearchParams({
    part: "snippet",
  }).toString()
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Authorization", `Bearer ${session?.accessToken}`)
  await fetch(URL_YOUTUBE + "commentThreads?" + params, {
    method: "POST",
    body: JSON.stringify({
      snippet: {
        videoId: videoId,
        topLevelComment: {
          snippet: {
            textOriginal: comment,
          },
        },
      },
    }),
    headers: myHeaders,
  })
  revalidateTag("commentThreads")
  // return res;
}

export async function actionCreateReplyComment(videoId: string, comment: string) {
  const session = await getUserSession()
  const params = new URLSearchParams({
    part: "snippet",
  }).toString()
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Authorization", `Bearer ${session?.accessToken}`)
  await fetch(URL_YOUTUBE + "commentThreads?" + params, {
    method: "POST",
    body: JSON.stringify({
      snippet: {
        videoId: videoId,
        topLevelComment: {
          snippet: {
            textOriginal: comment,
          },
        },
      },
    }),
    headers: myHeaders,
  })
  revalidateTag("commentThreads")
  // return res;
}

export async function actionDeleteComment(commentId: string) {
  const session = await getUserSession()
  const params = new URLSearchParams({
    id: commentId,
    key: KEY_YOUTUBE,
  }).toString()
  // const myHeaders = new Headers()
  // myHeaders.append("Content-Type", "application/json")
  // myHeaders.append("Authorization", `Bearer ${session?.accessToken}`)
  await fetch(URL_YOUTUBE + "comments?" + params, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
  revalidateTag("commentThreads")
}
