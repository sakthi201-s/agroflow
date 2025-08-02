'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Bill = {
  invoiceId: string;
  customer: string;
  company: 'Company 1' | 'Company 2';
  amount: string;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
};

const billingData: Bill[] = [
    { invoiceId: 'INV-2024001', customer: 'John Doe Farms', company: 'Company 1', amount: '$1,250.00', dueDate: '2024-07-30', status: 'Paid' },
    { invoiceId: 'INV-2024002', customer: 'Global Exports Inc.', company: 'Company 2', amount: '$15,000.00', dueDate: '2024-08-15', status: 'Pending' },
    { invoiceId: 'INV-2024003', customer: 'Agri Supplies Co.', company: 'Company 1', amount: '$800.50', dueDate: '2024-06-20', status: 'Overdue' },
    { invoiceId: 'INV-2024004', customer: 'Jane Smith Fields', company: 'Company 1', amount: '$3,500.00', dueDate: '2024-08-05', status: 'Pending' },
    { invoiceId: 'INV-2024005', customer: 'Maize Traders LLC', company: 'Company 2', amount: '$22,300.00', dueDate: '2024-07-25', status: 'Paid' },
    { invoiceId: 'INV-2024006', customer: 'Local Coop', company: 'Company 1', amount: '$550.00', dueDate: '2024-08-20', status: 'Pending' },
];

const columns = [
  { header: 'Invoice ID', accessorKey: 'invoiceId' as keyof Bill },
  { header: 'Customer/Org', accessorKey: 'customer' as keyof Bill },
  { header: 'Company', accessorKey: 'company' as keyof Bill },
  { header: 'Amount', accessorKey: 'amount' as keyof Bill },
  { header: 'Due Date', accessorKey: 'dueDate' as keyof Bill },
  { header: 'Status', accessorKey: 'status' as keyof Bill },
];


export default function BillingPage() {
    const [activeCompany, setActiveCompany] = useState<'Company 1' | 'Company 2'>('Company 1');
    const filteredData = billingData.filter(item => item.company === activeCompany);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Billing System</h1>
         <div className="flex items-center gap-4">
            <Tabs
            defaultValue="Company 1"
            onValueChange={(value) => setActiveCompany(value as 'Company 1' | 'Company 2')}
            className="transition-all duration-300"
            >
            <TabsList>
                <TabsTrigger value="Company 1">Fertilizer & Seeds</TabsTrigger>
                <TabsTrigger value="Company 2">Maize Import/Export</TabsTrigger>
            </TabsList>
            </Tabs>
            <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Create Bill
            </Button>
        </div>
      </div>
      <DataTable columns={columns} data={filteredData} tableName="Billing"/>
    </div>
  );
}
