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
  ChevronDown,
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import React from 'react';

const company1MenuItems = [
    {href: '/transactions', label: 'Transactions', icon: Book},
    {href: '/stock', label: 'Stock Management', icon: Boxes},
    {href: '/billing', label: 'Billing', icon: Receipt},
    {href: '/customers', label: 'Customers', icon: Users},
    {href: '/organizations', label: 'Organizations', icon: Building},
];

const company2MenuItems = [
    {href: '/transactions', label: 'Transactions', icon: Book},
    {href: '/stock', label: 'Stock Management', icon: Boxes},
    {href: '/billing', label: 'Billing', icon: Receipt},
    {href: '/farmers', label: 'Farmers', icon: Tractor},
    {href: '/organizations', label: 'Organizations', icon: Building},
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
            <SidebarMenuItem>
                <Link href="/dashboard" legacyBehavior={false} passHref>
                    <SidebarMenuButton
                    asChild
                    isActive={isActive('/dashboard')}
                    className={cn(isActive('/dashboard') && 'bg-primary/10 text-primary hover:bg-primary/20')}
                    tooltip="Dashboard"
                    >
                    <div>
                        <LayoutDashboard className="size-5" />
                        <span>Dashboard</span>
                    </div>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <Collapsible defaultOpen>
                <CollapsibleTrigger className="w-full text-sm font-semibold flex items-center justify-between p-2 rounded-md hover:bg-secondary">
                    Fertilizer & Seeds
                    <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenu className="pl-4">
                        {company1MenuItems.map((item) => (
                            <SidebarMenuItem key={`c1-${item.href}`}>
                            <Link href={`${item.href}?company=Company+1`} legacyBehavior={false} passHref>
                                <SidebarMenuButton
                                asChild
                                isActive={isActive(item.href) && new URLSearchParams(window.location.search).get('company') === 'Company 1'}
                                className={cn(isActive(item.href) && new URLSearchParams(window.location.search).get('company') === 'Company 1' && 'bg-primary/10 text-primary hover:bg-primary/20')}
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
                </CollapsibleContent>
            </Collapsible>
             <Collapsible>
                <CollapsibleTrigger className="w-full text-sm font-semibold flex items-center justify-between p-2 rounded-md hover:bg-secondary">
                    Maize Import/Export
                    <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenu className="pl-4">
                        {company2MenuItems.map((item) => (
                            <SidebarMenuItem key={`c2-${item.href}`}>
                            <Link href={`${item.href}?company=Company+2`} legacyBehavior={false} passHref>
                                <SidebarMenuButton
                                asChild
                                isActive={isActive(item.href) && new URLSearchParams(window.location.search).get('company') === 'Company 2'}
                                className={cn(isActive(item.href) && new URLSearchParams(window.location.search).get('company') === 'Company 2' && 'bg-primary/10 text-primary hover:bg-primary/20')}
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
                </CollapsibleContent>
            </Collapsible>
            <SidebarMenuItem>
                <Link href="/inventory-forecaster" legacyBehavior={false} passHref>
                    <SidebarMenuButton
                    asChild
                    isActive={isActive('/inventory-forecaster')}
                    className={cn(isActive('/inventory-forecaster') && 'bg-primary/10 text-primary hover:bg-primary/20')}
                    tooltip="AI Forecaster"
                    >
                    <div>
                        <BrainCircuit className="size-5" />
                        <span>AI Forecaster</span>
                    </div>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
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
