import NextAuth from "next-auth"
import "next-auth/jwt"

import MicrosoftEntraId from "next-auth/providers/microsoft-entra-id"

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: false,
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  providers: [
    MicrosoftEntraId({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret:process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      issuer:process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      return true
    },
    jwt({ token, profile, trigger, session, account }) {
      if (trigger === "update"){
        token.name = session.user.name
      }
      if(trigger === "signIn" && profile){
        token.roles = profile.roles;
        token.name = profile.name || "";
        token.email = profile.preferred_username;
      }
      return token
    },
    async session({ session, token }) {
      if(token){
        session.roles = token?.roles || [];
        session.name = token.name;
        session.email = token?.email || "";
        session.picture = token.picture;
        if(token.accessToken) session.accessToken = token.accessToken;
      }
      return session
    },
  }
})