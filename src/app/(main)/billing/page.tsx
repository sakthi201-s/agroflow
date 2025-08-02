
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

type Bill = {
  invoiceId: string;
  customer: string;
  company: 'Company 1' | 'Company 2';
  amount: string;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
};

const initialBillingData: Bill[] = [
    { invoiceId: 'INV-2024001', customer: 'John Doe Farms', company: 'Company 1', amount: '$1,250.00', dueDate: '2024-07-30', status: 'Paid' },
    { invoiceId: 'INV-2024002', customer: 'Global Exports Inc.', company: 'Company 2', amount: '$15,000.00', dueDate: '2024-08-15', status: 'Pending' },
    { invoiceId: 'INV-2024003', customer: 'Agri Supplies Co.', company: 'Company 1', amount: '$800.50', dueDate: '2024-06-20', status: 'Overdue' },
    { invoiceId: 'INV-2024004', customer: 'Jane Smith Fields', company: 'Company 1', amount: '$3,500.00', dueDate: '2024-08-05', status: 'Pending' },
    { invoiceId: 'INV-2024005', customer: 'Maize Traders LLC', company: 'Company 2', amount: '$22,300.00', dueDate: '2024-07-25', status: 'Paid' },
    { invoiceId: 'INV-2024006', customer: 'Local Coop', company: 'Company 1', amount: '$550.00', dueDate: '2024-08-20', status: 'Pending' },
];


export default function BillingPage() {
    const [activeCompany, setActiveCompany] = useState<'Company 1' | 'Company 2'>('Company 1');
    const [billingData, setBillingData] = useState<Bill[]>(initialBillingData);

    const handleStatusChange = (invoiceId: string, status: Bill['status']) => {
        setBillingData(billingData.map(bill => 
            bill.invoiceId === invoiceId ? { ...bill, status } : bill
        ));
    };

    const columns = [
      { header: 'Invoice ID', accessorKey: 'invoiceId' as keyof Bill },
      { header: 'Customer/Org', accessorKey: 'customer' as keyof Bill },
      { header: 'Company', accessorKey: 'company' as keyof Bill },
      { header: 'Amount', accessorKey: 'amount' as keyof Bill },
      { header: 'Due Date', accessorKey: 'dueDate' as keyof Bill },
      { 
        header: 'Status', 
        accessorKey: 'status' as keyof Bill,
        cell: ({ getValue }: { getValue: () => Bill['status'] }) => {
          const status = getValue();
          const variant = status === 'Paid' ? 'default' : status === 'Pending' ? 'secondary' : 'destructive';
          const className = status === 'Paid' ? 'bg-green-500/20 text-green-700' : status === 'Pending' ? 'bg-amber-500/20 text-amber-700' : 'bg-red-500/20 text-red-700';
          return <Badge variant={variant} className={className}>{status}</Badge>;
        }
      },
       {
        header: 'Actions',
        accessorKey: 'invoiceId' as keyof Bill, // Using invoiceId to identify the row
        cell: ({ row }: { row: { original: Bill } }) => {
            const bill = row.original;
            return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleStatusChange(bill.invoiceId, 'Paid')}>
                    Mark as Paid
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange(bill.invoiceId, 'Pending')}>
                    Mark as Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange(bill.invoiceId, 'Overdue')}>
                    Mark as Overdue
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            );
        },
      },
    ];
    
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
