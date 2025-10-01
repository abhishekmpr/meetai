"use client";

import { DashboardUserButton } from "@/modules/dashboard/ui/components/dashboard-user-button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BotIcon, VideoIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const firstsection = [
  { icon: VideoIcon, label: "Meetings", href: "/meetings" },
  { icon: BotIcon, label: "Agents", href: "/agents" },
];

const secondsection = [
  { icon: StarIcon, label: "Upgrade", href: "/upgrade" },
];

export const DashboardSidebar = () => {
  const pathname = usePathname(); // ✅ dynamic active route

  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href={"/"} className="flex items-center gap-2 px-2 pt-2">
          <Image src="/logo.svg" height={36} width={36} alt="Meet.AI" />
          <p className="text-2xl font-semibold">Meet.AI</p>
        </Link>
      </SidebarHeader>

      <div className="px-4 py-2">
        <Separator className="opacity-10 text-[#5D6B68]" />
      </div>

      <SidebarContent>
        {/* First Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstsection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "h-10 flex items-center gap-2 rounded-md border border-transparent px-2 hover:bg-linear-to-r/oklch hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                        pathname === item.href &&
                          "bg-linear-to-r/oklch border-[#5D6B68]/10"
                      )}
                    >
                      <item.icon className="size-5" />
                      <span className="text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="px-4 py-2">
          <Separator className="opacity-10 text-[#5D6B68]" />
        </div>

        {/* Second Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondsection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "h-10 flex items-center gap-2 rounded-md border border-transparent px-2 hover:bg-linear-to-r/oklch hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                        pathname === item.href &&
                          "bg-linear-to-r/oklch border-[#5D6B68]/10"
                      )}
                    >
                      <item.icon className="size-5" />
                      <span className="text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="text-white">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};
