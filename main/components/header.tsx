"use client";
import NewResume from "./NewResume";
import { SidebarTrigger } from "./ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import { AnimatedGradientText } from "./magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { isPremium } from "@/query/user/query";
import { Plus } from "lucide-react";

export function DashboardHeader() {
  const { data } = isPremium();

  const premium = data?.isPremium;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur-sm px-4 md:px-6 justify-between">
      <SidebarTrigger />
      {premium && (
        <div className="flex items-center gap-4">
          <div className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] ">
            <span
              className={cn(
                "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
              )}
              style={{
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "destination-out",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "subtract",
                WebkitClipPath: "padding-box",
              }}
            />
            ⭐ <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
            <AnimatedGradientText className="text-sm font-medium">
              PRO{" "}
            </AnimatedGradientText>
          </div>
        </div>
      )}
       <div className="flex gap-5 items-center justify-center">   <ModeToggle />
          <div className="flex  bg-white text-black p-2 rounded-lg gap-2 justify-center px-5 font-semibold">
            <NewResume type="resume" />
            <Plus />
          </div></div>
    </header>
  );
}
