import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import { session } from "@/lib/session"
import GoogleProvider from "next-auth/providers/google"

const GOOGLE_CLIENT_ID = "81541348737-e80e9e9l2o16ugm18ueddn343gu9cd48.apps.googleusercontent.com"

const GOOGLE_CLIENT_SECRECT = "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"

const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRECT,
      authorization: {
        params: {
          scope:
            "openid profile https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/yt-analytics.readonly",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      //   console.log("🚀 ~ signIn ~ account:", account)
      return true
    },
    session,
    jwt({ token, user, account, profile }) {
      //   console.log("🚀 ~ jwt ~ account:", token, account)
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
  },
}

const handler = NextAuth(authOption)
export { handler as GET, handler as POST }
