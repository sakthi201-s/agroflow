
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, User, Phone, Mail, MapPin, History } from 'lucide-react';
import Link from 'next/link';
import { customerData, Customer } from '@/lib/data';
import { CreateCustomerForm } from './components/create-customer-form';
import { useLocalStorage } from '@/hooks/use-local-storage';

export default function CustomersPage() {
  const [currentCustomerData, setCurrentCustomerData] = useLocalStorage<Customer[]>('customerData', customerData);
  const [isCreateCustomerOpen, setCreateCustomerOpen] = useState(false);

  const handleCustomerCreated = (newCustomer: Customer) => {
    setCurrentCustomerData(prev => [...prev, newCustomer]);
  };

  return (
    <>
    <CreateCustomerForm
      isOpen={isCreateCustomerOpen}
      onOpenChange={setCreateCustomerOpen}
      onCustomerCreated={handleCustomerCreated}
    />
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <Button onClick={() => setCreateCustomerOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Customer
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentCustomerData.map((customer) => (
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
    </>
  );
}
