"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BarChart, FileText, Github, Home, Layers, Linkedin, LogOut, Settings, Share2, User } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { signOut, useSession } from "next-auth/react"
import { Separator } from "../ui/separator"

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname()
  const{data,status}=useSession()
  if(status==='loading'){
    return
  }
  if(status==="unauthenticated"){
    router.push("/")
  }
    const user = data?.user;
  

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 px-2">
          <FileText className="h-5 w-5" />
          <span className="text-lg font-medium">ResumeOS</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard")} tooltip="Dashboard">
                  <Link href="/dashboard">
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/resume")} tooltip="Resume">
                  <Link href="/resume">
                    <FileText className="h-4 w-4" />
                    <span>Resume</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/templates")} tooltip="Templates">
                  <Link href="/templates">
                    <Layers className="h-4 w-4" />
                    <span>Templates</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/analytics")} tooltip="Analytics">
                  <Link href="/analytics">
                    <BarChart className="h-4 w-4" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Integrations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/integrations/linkedin")} tooltip="LinkedIn">
                  <Link href="/integrations/linkedin">
                    <Linkedin className="h-4 w-4" />
                    <span>LinkedIn</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/integrations/github")} tooltip="GitHub">
                  <Link href="/integrations/github">
                    <Github className="h-4 w-4" />
                    <span>GitHub</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <Separator/>
              <SidebarMenuItem>
                <SidebarMenuButton className="mt-5" onClick={()=>signOut()}>
                  <LogOut/>
                Logout
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>


        <SidebarSeparator />

        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 ring-2 ring-background">
              <AvatarImage src={user?.image||"/placeholder.svg?height=32&width=32"} alt="User" />
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.name||"guest"}</span>
              <span className="text-xs  text-muted-foreground">{user?.email}</span>
            </div>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
