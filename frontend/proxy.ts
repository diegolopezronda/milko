import { auth as proxy } from "@/auth"
import { is } from "zod/locales"

/*
https://nextjs.org/docs/app/api-reference/file-conventions/proxy
*/

export default proxy((req) => {
  const isLoggedIn = !!req.auth
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard")
  const isOnLogin = req.nextUrl.pathname.startsWith("/login")

  if (!isLoggedIn && !isOnLogin) {
    const loginUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(loginUrl)
  }

  if (isLoggedIn && !isOnDashboard) {
    const loginUrl = new URL("/dashboard", req.nextUrl.origin)
    return Response.redirect(loginUrl)
  }
})

export const config = {
  matcher: ["/dashboard/:path*", "/", "/login"],
}
