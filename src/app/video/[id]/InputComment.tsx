"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { URL_YOUTUBE } from "@/config"
import { useSession } from "next-auth/react"
import { actionCreateComment } from "@/app/action"

const FormSchema = z.object({
  comment: z.string().min(4, {
    message: "Comment must be at least 4 characters.",
  }),
})

export function InputComment({ videoId }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: "",
    },
  })
  const { data: session, status } = useSession()
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("🚀 ~ onSubmit ~ data:", data)
    await actionCreateComment(videoId, data?.comment)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Controller
          name="comment"
          control={control}
          render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, invalid },
          }) => (
            <>
              <Input
                className={error?.message ? "border-red-600" : ""}
                value={value}
                onChange={onChange}
                placeholder="Add a comment"
              />
            </>
          )}
        />
        <Button disabled={isSubmitting} type="submit">
          Submit
        </Button>
      </div>
    </form>
  )
}
