import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Import React Icons (Font Awesome and Material Design sets)
import { FaHome, FaShoppingBag, FaUserAstronaut } from "react-icons/fa";
import { MdDashboard, MdSettings, MdMessage } from "react-icons/md";

const items = [
  { title: "Dashboard", url: "/admin", icon: MdDashboard },
  { title: "Orders", url: "/admin/orders", icon: FaShoppingBag },
  { title: "Customers", url: "/admin/customers", icon: FaUserAstronaut },
  { title: "Messages", url: "/admin/messages", icon: MdMessage },
  { title: "Settings", url: "/admin/settings", icon: MdSettings },
]

export function AppSidebar() {
  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon" className="border-r border-neutral-800">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-neutral-500 font-bold tracking-widest uppercase text-[10px] mb-2">
            Admin Panel
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a 
                      href={item.url} 
                      className="flex items-center gap-3 px-3 py-2 text-neutral-400 hover:text-cyan-400 transition-colors duration-200 group"
                    >
                      <item.icon className="text-lg group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}