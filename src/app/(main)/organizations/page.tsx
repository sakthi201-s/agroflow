
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Building, User, Phone, Mail, History, Package } from 'lucide-react';
import Link from 'next/link';

export type Organization = {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  productTypes: string;
};

export const organizationData: Organization[] = [
  { id: 'ORG001', name: 'Agri Supplies Co.', contactPerson: 'Mark Johnson', phone: '555-0201', email: 'sales@agrisupplies.com', productTypes: 'Fertilizer, Seeds' },
  { id: 'ORG002', name: 'Global Exports Inc.', contactPerson: 'Susan Lee', phone: '555-0202', email: 'susan.lee@globalexports.com', productTypes: 'Maize' },
  { id: 'ORG003', name: 'Maize Traders LLC', contactPerson: 'David Chen', phone: '555-0203', email: 'david.chen@maizetraders.com', productTypes: 'Maize' },
  { id: 'ORG004', name: 'Heritage Seeds Ltd.', contactPerson: 'Maria Garcia', phone: '555-0204', email: 'maria.g@heritageseeds.com', productTypes: 'Seeds' },
];

export default function OrganizationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Organization Management</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Organization
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {organizationData.map((org) => (
          <Card key={org.id}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-muted-foreground" />
                    {org.name}
                </CardTitle>
                <CardDescription>ID: {org.id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{org.contactPerson}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{org.phone}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{org.email}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span>{org.productTypes}</span>
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild variant="outline" className="w-full">
                    <Link href={`/ledger/organization/${org.id}`}>
                        <History className="mr-2 h-4 w-4" />
                        View Ledger
                    </Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
