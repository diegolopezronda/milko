import { getAuth } from "@/auth-actions"
import { Profile } from "@/components/profile"
import { Session } from "next-auth"

export default async function Page() {
  const session = await getAuth()

  return <>{session && <Profile session={session} />}</>
}
