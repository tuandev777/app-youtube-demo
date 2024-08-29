"use client"
import { Button } from "@/components/ui/button"
import { SessionProvider, signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
export default function Reports() {
  const [header, setHeader] = useState([])
  const [dataReport, setDataReport] = useState([])
  const [state, setstate] = useState()
  const { data: session, status } = useSession()
  console.log("🚀 ~ Logout ~ session:", session)
  useEffect(() => {
    const url = "https://youtubeanalytics.googleapis.com/v2/reports"
    const params = new URLSearchParams({
      ids: "channel==MINE",
      startDate: "2024-01-01",
      endDate: "2024-10-20",
      metrics: "views,likes,comments,shares",
      dimensions: "day",
      sort: "-day",
      maxResults: "100",
      // key: "AIzaSyAvlbCwY4NRam0XlD1_wAFwOuHISMEFt60",
    })
    if (session?.accessToken) {
      fetch(`${url}?${params.toString()}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          Accept: "application/json",
        },
      }).then(async (res) => {
        const data = await res.json()
        setHeader(data?.columnHeaders)
        setDataReport(data?.rows)
      })
    }
  }, [session?.accessToken])
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          {header?.map((item) => (
            <TableHead key={item?.name}>{item?.name}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataReport?.map((item, key) => (
          <TableRow key={key}>
            {item?.map((itemChild, keyChild) => (
              <TableCell key={keyChild}>{itemChild}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
