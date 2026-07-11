"use client"
import { useEffect, useState, useReducer } from "react"
import { useForm, SubmitHandler, useWatch, Controller } from "react-hook-form"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Select, SelectItem } from "@/components/ui/select"
import { AccessDenied } from "@/components/access-denied"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SquareIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field"
import { type IFormInputs } from "./types"
import { getMilkQuality } from "./actions"
import { hasRoles } from "@/auth-actions"

export default function Page() {
  const [isAllowed, setAllowed] = useState<boolean | null>(null)
  useEffect(() => {
    hasRoles(["analyst","visitor"]).then((h: boolean | null) => {
      setAllowed(h || false)
    })
  }, [])
  const restrictions = {
    ph: {
      min: { value: 0, message: "Must be greater than or equal zero." },
      max: { value: 14, message: "Must be less than or equal 14." },
      valueAsNumber: true,
    },
    temperature: {
      min: { value: 0, message: "Must be greater than or equal zero." },
      max: { value: 100, message: "Must be less than or equal 100." },
      valueAsNumber: true,
    },
    taste: {},
    odor: {},
    fat: {},
    turbidity: {},
    colour: {
      min: { value: 0, message: "Must be greater than or equal zero." },
      max: { value: 255, message: "Must be less than or equal 255." },
      valueAsNumber: true,
    },
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ph:7,
      colour:255,
      temperature: 37,
      taste: "false",
      odor: "false",
      turbidity: "false",
      fat: "false",
    },
    mode: "onChange",
  })

  const [milkQuality, setMilkQuality] = useState<boolean | undefined>(undefined)
  const [milkColour, setMilkColour] = useState<string>("#FFFFFF")
  const [formIsVisible, toggleFormIsVisible] = useReducer((state) => {
    return !state
  }, true)
  
  const colourWatch = useWatch({
    control,
    name: "colour",
  })

  const defaultColour = 255

  useEffect(() => {
    let colour_min = [255, 221, 0]
    let colour = "#"
    colour_min.forEach((v, i) => {
      const d = 255 - v
      const alpha = (isNaN(colourWatch) ? defaultColour : colourWatch) / 255
      const p = Math.round(v + d * alpha)
      colour += p.toString(16).padStart(2, "0")
    })
    setMilkColour(colour)
  }, [colourWatch])
  

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const quality = await getMilkQuality(data)
    if (quality == null) {
      toast.error("Couldn't get the result. Please try later.")
    } else {
      setMilkQuality(quality)
      toggleFormIsVisible()
    }
  }

  return (
    <>
      <AccessDenied allowed={isAllowed}>
        <div className="grid grid-cols-3 gap-4">
          <Card className="col-span-1">
            <img
              src="/calculator.png"
              alt="Event cover"
              className="relative z-20 aspect-video w-full object-cover"
            />
            <CardHeader>
              <CardTitle>Milk quality calculator</CardTitle>
              <CardDescription>Machine Learning based</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Is your batch in top shape? Input your metrics into Milko’s
                ML-powered calculator to instantly analyze pH, fat, temperature,
                and more for an immediate quality grade.
              </p>
            </CardContent>
          </Card>
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Milk quality calculator</CardTitle>
              <CardDescription>
                This is a demo and it shouldn't replace manual inspection.
              </CardDescription>
            </CardHeader>
            {formIsVisible && (
              <>
                <CardContent>
                  <form
                    id="milk-quality-calculator"
                    className="mx-auto max-w-4xl space-y-6 rounded-xl border bg-card p-6 text-card-foreground"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <FieldGroup className="grid grid-cols-3">
                      <Field data-invalid={errors.ph ? "true" : "false"}>
                        <FieldLabel htmlFor="ph">pH</FieldLabel>
                        <Input
                          defaultValue={7}
                          type="number"
                          step="0.01"
                          aria-invalid={errors.ph ? "true" : "false"}
                          {...register("ph", restrictions.ph)}
                        />
                        {errors &&
                          errors.ph &&
                          errors.ph.message && (
                            <FieldError
                              errors={[{ message: errors.ph.message }]}
                            />
                          )}
                      </Field>
                      <Field
                        data-invalid={errors.temperature ? "true" : "false"}
                      >
                        <FieldLabel htmlFor="temperature">
                          Temperature
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupInput
                            type="number"
                            step="0.1"
                            aria-invalid={errors.temperature ? "true" : "false"}
                            {...register(
                              "temperature",
                              restrictions.temperature
                            )}
                          />
                          <InputGroupAddon align="inline-end">
                            C<sup>o</sup>
                          </InputGroupAddon>
                        </InputGroup>
                        {errors &&
                          errors.temperature &&
                          errors.temperature.message && (
                            <FieldError
                              errors={[{ message: errors.temperature.message }]}
                            />
                          )}
                      </Field>
                      <Field data-invalid={errors.colour ? "true" : "false"}>
                        <FieldLabel htmlFor="colour">Colour</FieldLabel>
                        <InputGroup>
                          <Input
                            type="number"
                            step="1"
                            aria-invalid={errors.colour ? "true" : "false"}
                            {...register("colour", restrictions.colour)}
                          />
                          <InputGroupAddon align="inline-end">
                            <SquareIcon fill={milkColour} />
                          </InputGroupAddon>
                        </InputGroup>
                        {errors && errors.colour && errors.colour.message && (
                          <FieldError
                            errors={[{ message: errors.colour.message }]}
                          />
                        )}
                      </Field>
                    </FieldGroup>
                    <FieldGroup className="grid grid-cols-4">
                      <Field data-invalid={errors.taste ? "true" : "false"}>
                        <FieldLabel htmlFor="taste">Taste</FieldLabel>
                        <Controller
                          control={control}
                          name="taste"
                          rules={restrictions.taste}
                          render={({ field }) => (
                            <Select
                              value={field.value}
                              // Radix/Shadcn uses onValueChange. If your library uses onChange, swap this out.
                              onValueChange={field.onChange}
                              aria-invalid={errors.taste ? "true" : "false"}
                            >
                              <SelectItem value="true">High</SelectItem>
                              <SelectItem value="false">Low</SelectItem>
                            </Select>
                          )}
                        />
                        {errors && errors.taste && errors.taste.message && (
                          <FieldError
                            errors={[{ message: errors.taste.message }]}
                          />
                        )}
                      </Field>
                      <Field data-invalid={errors.odor ? "true" : "false"}>
                        <FieldLabel htmlFor="odor">Odor</FieldLabel>
                        <Controller
                          control={control}
                          name="odor"
                          rules={restrictions.odor}
                          render={({ field }) => (
                            <Select
                              value={field.value}
                              // Radix/Shadcn uses onValueChange. If your library uses onChange, swap this out.
                              onValueChange={field.onChange}
                              aria-invalid={errors.odor ? "true" : "false"}
                            >
                              <SelectItem value="true">High</SelectItem>
                              <SelectItem value="false">Low</SelectItem>
                            </Select>
                          )}
                        />
                        {errors && errors.odor && errors.odor.message && (
                          <FieldError
                            errors={[{ message: errors.odor.message }]}
                          />
                        )}
                      </Field>
                      <Field data-invalid={errors.fat ? "true" : "false"}>
                        <FieldLabel htmlFor="fat">Fat</FieldLabel>
                        <Controller
                          control={control}
                          name="fat"
                          rules={restrictions.fat}
                          render={({ field }) => (
                            <Select
                              value={field.value}
                              // Radix/Shadcn uses onValueChange. If your library uses onChange, swap this out.
                              onValueChange={field.onChange}
                              aria-invalid={errors.fat ? "true" : "false"}
                            >
                              <SelectItem value="true">High</SelectItem>
                              <SelectItem value="false">Low</SelectItem>
                            </Select>
                          )}
                        />
                        {errors && errors.fat && errors.fat.message && (
                          <FieldError
                            errors={[{ message: errors.fat.message }]}
                          />
                        )}
                      </Field>
                      <Field data-invalid={errors.turbidity ? "true" : "false"}>
                        <FieldLabel htmlFor="turbidity">Turbidity</FieldLabel>
                        <Controller
                          control={control}
                          name="turbidity"
                          rules={restrictions.turbidity}
                          render={({ field }) => (
                            <Select
                              value={field.value}
                              // Radix/Shadcn uses onValueChange. If your library uses onChange, swap this out.
                              onValueChange={field.onChange}
                              aria-invalid={errors.turbidity ? "true" : "false"}
                            >
                              <SelectItem value="true">High</SelectItem>
                              <SelectItem value="false">Low</SelectItem>
                            </Select>
                          )}
                        />
                        {errors &&
                          errors.turbidity &&
                          errors.turbidity.message && (
                            <FieldError
                              errors={[{ message: errors.turbidity.message }]}
                            />
                          )}
                      </Field>
                    </FieldGroup>
                  </form>
                </CardContent>
                <CardFooter>
                  <Field orientation="horizontal">
                    <Button
                      type="submit"
                      className="w-full"
                      form="milk-quality-calculator"
                    >
                      Submit
                    </Button>
                  </Field>
                </CardFooter>
              </>
            )}
            {!formIsVisible && (
              <>
                <CardContent className="flex flex-1 flex-col items-center justify-center">
                  Your result is
                  <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
                    {milkQuality ? "Healthy" : "Spoiled"}
                  </h1>
                </CardContent>
                <CardFooter>
                  <Field orientation="horizontal">
                    <Button
                      type="submit"
                      className="w-full"
                      onClick={toggleFormIsVisible}
                    >
                      Back to form
                    </Button>
                  </Field>
                </CardFooter>
              </>
            )}
          </Card>
        </div>
      </AccessDenied>
      <Toaster />
    </>
  )
}
