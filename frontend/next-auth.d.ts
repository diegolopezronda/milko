import NextAuth, { type DefaultSession } from "next-auth"
import { type JWT } from "next-auth/jwt"
import { StringFormatParams } from "zod/v4/core"

/*
https://next-auth.js.org/getting-started/typescript
*/

declare module "next-auth" {
  interface Session {
    name: string | null
    picture: string
    email: string | null
    roles: string[]
    accessToken?: string
    user: {
      roles?: string[]
    } & DefaultSession["user"]
  }

  interface Profile {
    name: string | null
    preferred_username: string | null
    roles: string[]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name: string | null
    picture: string
    email?: string | null
    roles?: string[]
    accessToken?: string
  }
}
