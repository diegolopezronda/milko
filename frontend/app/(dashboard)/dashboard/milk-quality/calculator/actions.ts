"use server"
import { auth } from "@/auth"
import { type IFormInputs } from "./types"

export async function getMilkQuality(
  formData: IFormInputs
): Promise<boolean | null> {
  const session = await auth()
  const token = session?.accessToken

  if (!token) {
    return null
  }
  try {
    const params = new URLSearchParams()
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params.append(key, String(value))
      }
    })
    
    const response = await fetch(
      `${process.env.MILKO_API_URL}/qa/calculate?${params}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 },
      }
    )
    if (!response.ok) {
      return null
    }
    const data = await response.json()
    return data.quality > 2
  } catch (error) {
    return null
  }
}
