
'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { DataTable } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { initialTransactionData, Transaction } from '@/lib/data';

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

function TransactionsComponent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const company = searchParams.get('company') || 'Company 1';
    const activeCompany = company as 'Company 1' | 'Company 2';
    
    const [transactionData, setTransactionData] = useState<Transaction[]>(initialTransactionData);
    
    const handleCompanyChange = (company: string) => {
        router.push(`/transactions?company=${company}`);
    };
    
    const filteredData = transactionData.filter(item => item.company === activeCompany);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transactions</h1>
         <div className="flex items-center gap-4">
            <Tabs
                defaultValue={activeCompany}
                onValueChange={handleCompanyChange}
                className="transition-all duration-300"
            >
                <TabsList>
                    <TabsTrigger value="Company 1">Fertilizer & Seeds</TabsTrigger>
                    <TabsTrigger value="Company 2">Maize Import/Export</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        This is a read-only view of all financial transactions. Entries are automatically created from other modules like Billing.
      </p>
      <DataTable columns={columns} data={filteredData} tableName="Transactions" />
    </div>
  );
}

export default function TransactionsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TransactionsComponent />
        </Suspense>
    )
}
