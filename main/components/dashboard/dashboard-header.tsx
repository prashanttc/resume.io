import NewResume from "../NewResume";
import { SidebarTrigger } from "../ui/sidebar";
import { ModeToggle } from "../mode-toggle";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur-sm px-4 md:px-6 justify-between">
      <SidebarTrigger />
      <div className="flex items-center gap-4">
        <ModeToggle />
        <NewResume />
      </div>
    </header>
  );
}
