import NextAuth, { type DefaultSession } from "next-auth"
import { type JWT } from "next-auth/jwt"

/*
https://next-auth.js.org/getting-started/typescript
*/

declare module "next-auth" {
  interface Session {
    accessToken?: string
    user: {
      roles?: string[]
    } & DefaultSession["user"]
  }

  interface Profile {
    roles?: string[]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    roles?: string[]
  }
}