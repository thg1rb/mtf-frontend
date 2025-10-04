import React from 'react'
import { Home, Building, Users, Files, ReceiptText, ChevronUp, User, LogOut } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'

const menuItems = [
    {
        title: "จัดการงาน",
        url: "/tasks",
        icon: Files,
    },
    {
        title: "แดชบอร์ด",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "จัดการนายจ้าง",
        url: "/employers",
        icon: Building,
    },
    {
        title: "จัดการลูกจ้าง",
        url: "/employees",
        icon: Users,
    },
    {
        title: "จัดการใบเสร็จ",
        url: "/receipts",
        icon: ReceiptText,
    },
]

export default function AgentSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="border-b border-sidebar-border">
                <div className="flex items-center justify-between px-3 py-2">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                            <Building className="w-4 h-4 text-sidebar-primary-foreground" />
                        </div>
                        <div>
                            <h2 className="font-bold !text-[16px] text-sidebar-foreground">MTF Manpower</h2>
                            <p className="text-xs text-sidebar-foreground/70">ระบบจัดการเอกสาร</p>
                        </div>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((menuItem) => (
                                <SidebarMenuItem key={menuItem.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={menuItem.url}>
                                            {<menuItem.icon />}
                                            <span>{menuItem.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="w-full justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-6 h-6">
                                            <AvatarFallback className="text-xs">นจ</AvatarFallback>
                                        </Avatar>
                                        <div className="text-left">
                                            <p className="font-extralight">จัดการนายหน้า</p>
                                            <p className="text-thin text-sidebar-foreground/70">admin@mtf.com</p>
                                        </div>
                                    </div>
                                    <ChevronUp className="w-4 h-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuItem>
                                    <User className="w-4 h-4 mr-2" />
                                    ตั้งค่าบัญชี
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogOut className="w-4 h-4 mr-2" />
                                    ออกจากระบบ
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
