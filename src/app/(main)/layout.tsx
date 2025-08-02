import {AppSidebar} from '@/components/app-sidebar';
import {PageHeader} from '@/components/page-header';
import {SidebarProvider, SidebarInset} from '@/components/ui/sidebar';
import React from 'react';

export default function MainLayout({children}: {children: React.ReactNode}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col">
        <PageHeader />
        <SidebarInset>
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
