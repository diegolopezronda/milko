import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Page() {

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Card className="mx-auto pt-0">
          <img
            src="/calculator.png"
            alt="Event cover"
            className="relative z-20 aspect-video w-full object-cover"
          />
          <CardHeader>
            <CardTitle>Milk quality calculator</CardTitle>
            <CardDescription>Machine Learning based</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <p>
              Is your batch in top shape? Input your metrics into Milko’s
              ML-powered calculator to instantly analyze pH, fat, temperature,
              and more for an immediate quality grade.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Link href="/dashboard/milk-quality/calculator">
                Go to Milk quality calculator
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="mx-auto pt-0">
          <img
            src="/model-status.png"
            alt="Event cover"
            className="relative z-20 aspect-video w-full object-cover"
          />
          <CardHeader>
            <CardTitle>Milk quality prediction model</CardTitle>
            <CardDescription>Machine Learning based</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <p>
              Dive into the science behind the dairy. Explore the breakthrough
              research driving Milko’s predictive AI, and check the live
              accuracy, validation metrics, and training status of our model in
              real time.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Link href="/dashboard/milk-quality/model-status">
                Go to Milk quality prediction model
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
