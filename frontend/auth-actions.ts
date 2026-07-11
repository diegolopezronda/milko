"use server"
import { signIn,signOut } from "@/auth"

export async function handleLogin(){
  await signIn("microsoft-entra-id", { redirectTo: "/dashboard" })
}

export async function handleLogout(){
  await signOut({ redirectTo: "/login" })
}