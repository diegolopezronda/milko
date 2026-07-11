import { Card, CardContent } from "@/components/ui/card"
import { ConstructionIcon } from "lucide-react"

export function NotAvailable() {
  return (
    <>
      <div className="flex h-full flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-4xl">
          <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
              <CardContent className="grid p-0 md:grid-cols-2">
                <div className="flex h-80 flex-col items-center justify-center p-6">
                  <ConstructionIcon className="h-16 w-16 stroke-yellow-700 pb-4"></ConstructionIcon>
                  <h2 className="font-600 text-2xl">Not available</h2>
                  <h3 className="text-l">
                    This feature is not available yet.
                  </h3>
                </div>
                <div className="relative hidden bg-muted md:block">
                  <img
                    src="/not-available.png"
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
