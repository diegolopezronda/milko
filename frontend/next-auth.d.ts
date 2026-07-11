import NextAuth, { type DefaultSession } from "next-auth"
import { type JWT } from "next-auth/jwt"
import { StringFormatParams } from "zod/v4/core"

/*
https://next-auth.js.org/getting-started/typescript
*/

declare module "next-auth" {
  interface User {
    name: string
    email: string
    picture: string | null
    roles: string[]
    initials: string
  }

  interface Session {
    tokenClaims: {
      exp: number | undefined
      iat: number | undefined
      jti: string | undefined
      sub: string | undefined
    }
    accessToken: string
    user: User & DefaultSession["user"]
  }

  interface Profile {
    name: string
    preferred_username: string
    roles: string[]
  }
}

declare module "next-auth/jwt" {

  interface JWT {
    name: string
    picture: string | undefined
    email: string
    roles: string[]
    initials: string
    access_token : string | undefined
  }
}
