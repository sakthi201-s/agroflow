
'use client';

import {
  Boxes,
  Building,
  LayoutDashboard,
  Receipt,
  Tractor,
  Users,
  BrainCircuit,
  Package,
  Book,
  BookOpen,
  ArrowRightLeft,
} from 'lucide-react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {cn} from '@/lib/utils';
import {Avatar, AvatarFallback, AvatarImage} from './ui/avatar';

const menuItems = [
  {href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard},
  {href: '/transactions', label: 'Transactions', icon: ArrowRightLeft},
  {href: '/day-book', label: 'Day Book', icon: BookOpen},
  {href: '/stock', label: 'Stock Management', icon: Boxes},
  {href: '/billing', label: 'Billing', icon: Receipt},
  {href: '/customers', label: 'Customers', icon: Users},
  {href: '/farmers', label: 'Farmers', icon: Tractor},
  {href: '/organizations', label: 'Organizations', icon: Building},
  {href: '/inventory-forecaster', label: 'AI Forecaster', icon: BrainCircuit},
];

export function AppSidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Package className="size-8 text-primary" />
          <h1 className="text-xl font-semibold">AgriFlow</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior={false} passHref>
                <SidebarMenuButton
                  asChild
                  isActive={isActive(item.href)}
                  className={cn(isActive(item.href) && 'bg-primary/10 text-primary hover:bg-primary/20')}
                  tooltip={item.label}
                >
                  <div>
                    <item.icon className="size-5" />
                    <span>{item.label}</span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
       <SidebarFooter>
         <div className="flex items-center gap-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://avatar.vercel.sh/user" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="text-sm font-semibold">User</span>
                <span className="text-xs text-muted-foreground">user@agriflow.com</span>
            </div>
         </div>
      </SidebarFooter>
    </Sidebar>
  );
}
