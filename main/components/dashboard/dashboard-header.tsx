import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NewResume from "../NewResume";
import { SidebarTrigger } from "../ui/sidebar";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur-sm px-4 md:px-6 justify-between">
      <SidebarTrigger/>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full relative hover-lift"
            >
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-auto">
              <DropdownMenuItem className="flex flex-col items-start py-2">
                <span className="font-medium">Resume viewed</span>
                <span className="text-xs text-muted-foreground">
                  Your resume was viewed 5 times this week
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  2 hours ago
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start py-2">
                <span className="font-medium">New template available</span>
                <span className="text-xs text-muted-foreground">
                  Modern Professional template is now available
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  Yesterday
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start py-2">
                <span className="font-medium">LinkedIn sync completed</span>
                <span className="text-xs text-muted-foreground">
                  Your LinkedIn profile was successfully synced
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  3 days ago
                </span>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center justify-center text-sm font-medium text-primary">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
            <NewResume/>
        </DropdownMenu>
      </div>
    </header>
  );
}
