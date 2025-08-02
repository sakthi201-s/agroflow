'use client';

import {SidebarTrigger} from '@/components/ui/sidebar';
import {usePathname} from 'next/navigation';
import { ChevronRight } from 'lucide-react';

export function PageHeader() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const title = segments.length > 0 ? segments[segments.length - 1] : 'Dashboard';

  const formatSegment = (segment: string) => {
    return segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">AgriFlow</span>
          {segments.length > 0 && <ChevronRight className="h-4 w-4" />}
          <span className="capitalize">{formatSegment(title)}</span>
        </div>
      </div>
    </header>
  );
}
