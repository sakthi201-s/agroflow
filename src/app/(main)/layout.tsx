import {AppSidebar} from '@/components/app-sidebar';
import {PageHeader} from '@/components/page-header';
import {SidebarProvider, SidebarInset} from '@/components/ui/sidebar';
import React from 'react';

export default function MainLayout({children}: {children: React.ReactNode}) {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <PageHeader />
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
