import { User, getServerSession } from "next-auth"

export const session = async ({ session, token }: any) => {
  //   console.log("🚀 ~ session ~ token:", token)
  session.user.id = token.id
  session.accessToken = token.accessToken
  return session
}

export const getUserSession = async (): Promise<User> => {
  const authUserSession = await getServerSession({
    callbacks: {
      session,
    },
  })
  // console.log("🚀 ~ GOOGLE_CLIENT_ID:", authUserSession)
  //   if (!authUserSession) throw new Error("unauthorized")
  return { ...authUserSession?.user, accessToken: authUserSession?.accessToken }
}
