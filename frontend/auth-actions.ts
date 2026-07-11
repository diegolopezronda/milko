"use server"
import { signIn, signOut, auth } from "@/auth"
import { cookies } from "next/headers";

export async function handleLogin() {
  await signIn("microsoft-entra-id", { redirectTo: "/dashboard" })
}

export async function handleLogout() {
  await signOut({ redirectTo: "/login" })
}

export async function getAuth() {
  const session = await auth()
  return session
}

export async function hasRoles(roles: string[]) {
  const session = await auth()
  if (session && session.user && session.user.roles) {
    for (let r of roles) {
      if (session.user.roles.includes(r) === true) {
        return true
      }
    }
  }
  return false
}
