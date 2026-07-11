import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import { handleLogin } from "../../../auth-actions"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-center text-xl">
                <a
                  href="#"
                  className="items-center gap-2 self-center font-medium"
                >
                  <img
                    src="logo.png"
                    alt="Milko, Dairy forever"
                    className="inline w-34"
                  />
                </a>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <Button type="submit" onClick={handleLogin}>
                    Login with Microsoft
                  </Button>
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
