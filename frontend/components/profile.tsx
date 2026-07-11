import { Card, CardContent } from "@/components/ui/card"
import { User } from "next-auth"
import { Badge } from "@/components/ui/badge"
import { Avatar,AvatarImage,AvatarFallback } from "@/components/ui/avatar"

export function Profile({ user }: Readonly<{ user: User }>) {
  return (
    <>
      <div className="flex h-full flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-4xl">
          <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
              <CardContent className="grid p-0 md:grid-cols-2">
                <div className="flex h-80 flex-col items-center justify-center p-6">
                  <Avatar className="w-24 h-24 m-4">
                    <AvatarImage src={user.picture || ""} />
                    <AvatarFallback className="text-2xl">{user.initials}</AvatarFallback>
                  </Avatar>
                  <h2 className="font-600 text-2xl">{user.name}</h2>
                  <h3 className="text-l pb-6">{user.email}</h3>
                  <div>
                    {user &&
                      user.roles &&
                      user.roles.map((r) => {
                        return (
                          <Badge key={r} className="uppercase">
                            {r}
                          </Badge>
                        )
                      })}
                  </div>
                </div>
                <div className="relative hidden bg-muted md:block">
                  <img
                    src="/inland.png"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
