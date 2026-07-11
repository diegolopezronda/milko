import { getAuth } from "@/auth-actions"
import { Profile } from "@/components/profile"
import { User } from "next-auth"

export default async function Page() {
  const session = await getAuth()
  const user = session?.user

  return <>{session && user && <Profile user={user} />}</>
}
