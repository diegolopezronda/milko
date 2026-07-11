import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getAuth } from "@/auth-actions"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function Page() {
  const session = await getAuth()
  const names = session && session.name ? session.name.split(" ") : []
  const l = names ? names.length - 1 : 0
  const initials = names ? [0][0] + (l > 0 ? names[l][0] : "") : ""

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <Card className="col-span-1 justify-center">
          <CardHeader className="flex flex-col items-center justify-center text-center">
            <Avatar className="inline h-24 w-24">
              <AvatarImage src={session?.picture} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <CardTitle>
              <h1 className="text-4xl font-bold">{session?.name}</h1>
            </CardTitle>
            <CardDescription>{session?.email}</CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col items-center">
            {session &&
              session.roles &&
              session.roles.map((r) => {
                return (
                  <Badge key={r} className="uppercase">
                    {r}
                  </Badge>
                )
              })}
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
