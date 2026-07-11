import { Geist, Geist_Mono } from "next/font/google"

import "../globals.css"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { HomeIcon, MilkIcon } from "lucide-react"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const data = {
  user: {
    name: "Rick Alien",
    email: "rick@milko.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Milko",
      logo: (
        <img
          src="/logo-square.png"
          alt="Milko, Dairy forever"
          className="inline"
        />
      ),
      plan: "Headquarters",
    },
  ],
  nav_main: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <HomeIcon />,
      isActive: true,
      items: [
        {
          title: "Home",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "Milk Quality",
      url: "/dashboard/milk-quality",
      icon: <MilkIcon />,
      isActive: true,
      items: [
        {
          title: "Calculator",
          url: "/dashboard/milk-quality/calculator",
        },
        {
          title: "Model Status",
          url: "/dashboard/milk-quality/model-status",
        },
      ],
    },
  ],
  projects: [
    /*
    {
      name: "Design Engineering",
      url: "#",
      icon: <FrameIcon />,
    }
    <NavProjects projects={data.projects} />
    */
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <SidebarProvider>
              <AppSidebar
                user={data.user}
                teams={data.teams}
                nav_main={data.nav_main}
              />
              <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                  <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                      orientation="vertical"
                      className="mr-2 data-vertical:h-4 data-vertical:self-auto"
                    />
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                          <BreadcrumbLink href="/dashboard">
                            Milko Dashboard
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                  {children}
                </div>
              </SidebarInset>
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
