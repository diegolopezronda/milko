import { Card, CardContent,CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { BanIcon } from "lucide-react"

export function AccessDenied({
  allowed,
  children,
}: Readonly<{ allowed: boolean | null; children: React.ReactNode }>) {
  if (allowed == null) {
    return (
      <>
        <Card className="w-full max-w-xs">
          <CardHeader>
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="aspect-video w-full" />
          </CardContent>
        </Card>
      </>
    )
  }
  if (allowed == false) {
    return (
      <>
        <div className="flex h-full flex-col items-center justify-center bg-muted p-6 md:p-10">
          <div className="w-full max-w-sm md:max-w-4xl">
            <div className="flex flex-col gap-6">
              <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                  <div className="flex h-80 flex-col items-center justify-center p-6">
                    <BanIcon className="h-16 w-16 pb-4 stroke-red-700"></BanIcon>
                    <h2 className="font-600 text-2xl">Access denied</h2>
                    <h3 className="text-l">
                      Your role does not have enough privileges to access this
                      content.
                    </h3>
                  </div>
                  <div className="relative hidden bg-muted md:block">
                    <img
                      src="/cow.png"
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
  return <>{children}</>
}
