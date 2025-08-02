'use client';

import { useState } from 'react';
import { DataTable } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type Transaction = {
  id: string;
  date: string;
  type: 'Sale' | 'Purchase';
  company: 'Company 1' | 'Company 2';
  counterparty: string;
  counterpartyType: 'Customer' | 'Farmer' | 'Organization';
  productName: string;
  quantity: number;
  unit: 'kg' | 'ton' | 'bags';
  amount: string;
};

export const transactionData: Transaction[] = [
  { id: 'TRN001', date: '2024-07-15', type: 'Sale', company: 'Company 1', counterparty: 'John Doe Farms', counterpartyType: 'Customer', productName: 'Urea Fertilizer', quantity: 50, unit: 'bags', amount: '$1,250.00' },
  { id: 'TRN002', date: '2024-07-14', type: 'Purchase', company: 'Company 2', counterparty: 'Samuel Miller', counterpartyType: 'Farmer', productName: 'Yellow Maize', quantity: 20, unit: 'ton', amount: '$4,000.00' },
  { id: 'TRN003', date: '2024-07-12', type: 'Purchase', company: 'Company 1', counterparty: 'Agri Supplies Co.', counterpartyType: 'Organization', productName: 'DAP Fertilizer', quantity: 100, unit: 'bags', amount: '$3,500.00' },
  { id: 'TRN004', date: '2024-07-11', type: 'Sale', company: 'Company 1', counterparty: 'Jane Smith Fields', counterpartyType: 'Customer', productName: 'Hybrid Maize Seeds', quantity: 10, unit: 'bags', amount: '$500.00' },
  { id: 'TRN005', date: '2024-07-10', type: 'Sale', company: 'Company 1', counterparty: 'Local Coop', counterpartyType: 'Customer', productName: 'Urea Fertilizer', quantity: 20, unit: 'bags', amount: '$500.00' },
  { id: 'TRN006', date: '2024-07-09', type: 'Purchase', company: 'Company 2', counterparty: 'Isabella Garcia', counterpartyType: 'Farmer', productName: 'White Maize', quantity: 30, unit: 'ton', amount: '$6,300.00' },
  { id: 'TRN007', date: '2024-07-08', type: 'Purchase', company: 'Company 1', counterparty: 'Heritage Seeds Ltd.', counterpartyType: 'Organization', productName: 'Sorghum Seeds', quantity: 50, unit: 'bags', amount: '$1,200.00' },
  { id: 'TRN008', date: '2024-07-05', type: 'Sale', company: 'Company 1', counterparty: 'Green Valley Gardens', counterpartyType: 'Customer', productName: 'DAP Fertilizer', quantity: 15, unit: 'bags', amount: '$525.00' },
];

const columns = [
  { header: 'Voucher No.', accessorKey: 'id' as keyof Transaction },
  { header: 'Date', accessorKey: 'date' as keyof Transaction },
  {
    header: 'Voucher Type',
    accessorKey: 'type' as keyof Transaction,
    cell: ({ getValue }: { getValue: () => 'Sale' | 'Purchase' }) => {
      const type = getValue();
      return (
        <Badge variant={type === 'Sale' ? 'default' : 'secondary'} className={type === 'Sale' ? 'bg-green-500/20 text-green-700' : 'bg-amber-500/20 text-amber-700'}>
          {type}
        </Badge>
      );
    },
  },
  { header: 'Party Name', accessorKey: 'counterparty' as keyof Transaction },
  {
    header: 'Party Type',
    accessorKey: 'counterpartyType' as keyof Transaction,
    cell: ({ getValue }: { getValue: () => string }) => <Badge variant="outline">{getValue()}</Badge>,
  },
  { header: 'Product', accessorKey: 'productName' as keyof Transaction },
  { header: 'Quantity', accessorKey: 'quantity' as keyof Transaction },
  { header: 'Unit', accessorKey: 'unit' as keyof Transaction },
  {
    header: 'Amount',
    accessorKey: 'amount' as keyof Transaction,
    cell: ({ getValue }: { getValue: () => string }) => (
      <span className="font-medium">{getValue()}</span>
    ),
  },
];

export default function TransactionsPage() {
    const [activeCompany, setActiveCompany] = useState<'Company 1' | 'Company 2'>('Company 1');
    const filteredData = transactionData.filter(item => item.company === activeCompany);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transactions</h1>
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
            <PlusCircle className="mr-2 h-4 w-4" /> Create Voucher
            </Button>
        </div>
      </div>
      <DataTable columns={columns} data={filteredData} tableName="Transactions" />
    </div>
  );
}
