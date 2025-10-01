import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";

interface Props{
   children: React.ReactNode
}

import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "lucide-react";
import { Children } from "react";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";

const Layout =({children}:Props)=>{

    return(
        <SidebarProvider>
            <DashboardSidebar/>
            
            <main className="flex flex-col h-screen w-screen bg-muted"> 
                <DashboardNavbar/>  {
                children
            }</main>
         
        </SidebarProvider>
    )
}
export default Layout;