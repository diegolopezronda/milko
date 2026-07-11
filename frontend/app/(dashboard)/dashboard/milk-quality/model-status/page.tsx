"use client"
import { useEffect, useState } from "react"
import { AccessDenied } from "@/components/access-denied"
import { hasRoles } from "@/auth-actions"
import { NotAvailable } from "@/components/not-available"

export default function Page() {
  const [isAllowed, setAllowed] = useState<boolean | null>(null)
  useEffect(() => {
    hasRoles(["analyst"]).then((h: boolean | null) => {
      setAllowed(h || false)
    })
  }, [])

  return (
    <>
      <AccessDenied allowed={isAllowed}>
        <NotAvailable/>
      </AccessDenied>
    </>
  )
}
