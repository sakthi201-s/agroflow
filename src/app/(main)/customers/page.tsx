'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, User, Phone, Mail, MapPin, History } from 'lucide-react';
import Link from 'next/link';

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  lastPurchaseDate: string;
};

export const customerData: Customer[] = [
  { id: 'CUS001', name: 'John Doe Farms', phone: '555-0101', email: 'john.doe@example.com', address: '123 Farm Rd, Rural Town', lastPurchaseDate: '2024-05-15' },
  { id: 'CUS002', name: 'Jane Smith Fields', phone: '555-0102', email: 'jane.smith@example.com', address: '456 Meadow Ln, Greenfield', lastPurchaseDate: '2024-06-01' },
  { id: 'CUS003', name: 'Local Coop', phone: '555-0103', email: 'contact@localcoop.com', address: '789 Market St, Cityville', lastPurchaseDate: '2024-05-28' },
  { id: 'CUS004', name: 'Green Valley Gardens', phone: '555-0104', email: 'info@gvgardens.net', address: '321 Orchard Ave, Fruitdale', lastPurchaseDate: '2024-06-10' },
];

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Customer
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {customerData.map((customer) => (
          <Card key={customer.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-muted-foreground" />
                        {customer.name}
                    </CardTitle>
                    <CardDescription>ID: {customer.id}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{customer.address}</span>
              </div>
            </CardContent>
            <CardFooter>
                <Button asChild variant="outline" className="w-full">
                    <Link href={`/ledger/customer/${customer.id}`}>
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
