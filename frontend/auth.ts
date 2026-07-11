import NextAuth from "next-auth"
import "next-auth/jwt"

import MicrosoftEntraId from "next-auth/providers/microsoft-entra-id"

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: true,
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  providers: [
    MicrosoftEntraId({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret:process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      issuer:"https://login.microsoftonline.com/common/v2.0"
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      return true
    },
    jwt({ token, trigger, session, account }) {
      if (trigger === "update") token.name = session.user.name
      return token
    },
    async session({ session, token }) {
      if (token?.accessToken) session.accessToken = token.accessToken
      return session
    },
  }
})