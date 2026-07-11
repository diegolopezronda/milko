import NextAuth from "next-auth"
import "next-auth/jwt"

import MicrosoftEntraId from "next-auth/providers/microsoft-entra-id"

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: false,
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  providers: [
    MicrosoftEntraId({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      return true
    },
    jwt({ token, profile, trigger, session, account }) {
      if (trigger === "update") {
        token.name = session.user.name
      }
      if (trigger === "signIn" && profile && account) {
        token.email = profile.preferred_username || ""
        token.roles = profile.roles
        delete token.picture
        token.access_token = account.id_token
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        if (token.access_token) {
          session.accessToken = token.access_token
        }
        const names = token.name.split(" ")
        const l = names.length - 1
        const initials = names[0][0] + (l == 0 ? "" : names[l][0])
        session.user.initials = initials
        session.user.roles = token.roles || []
        session.user.name = token.name || ""
        session.user.email = token.email
        session.user.picture = token.picture || ""
      }

      return session
    },
  },
})
