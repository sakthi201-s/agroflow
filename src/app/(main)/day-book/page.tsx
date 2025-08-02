
'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { DataTable } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { initialTransactionData, Transaction } from '@/lib/data';
import { CreateVoucherForm } from './components/create-voucher-form';

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

function DayBookComponent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const company = searchParams.get('company') || 'Company 1';
    const activeCompany = company as 'Company 1' | 'Company 2';
    
    const [transactionData, setTransactionData] = useState<Transaction[]>(initialTransactionData);

    const handleCompanyChange = (company: string) => {
        router.push(`/day-book?company=${company}`);
    };

    const addTransaction = (newTransaction: Omit<Transaction, 'id' | 'company'>) => {
        setTransactionData(prev => [
            { 
                ...newTransaction, 
                id: `TRN${(prev.length + 1).toString().padStart(3, '0')}`,
                company: activeCompany
            }, 
            ...prev
        ]);
    };
    
    const filteredData = transactionData.filter(item => item.company === activeCompany);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Day Book</h1>
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
            <CreateVoucherForm onSubmit={addTransaction} />
        </div>
      </div>
      <DataTable columns={columns} data={filteredData} tableName="DayBook" />
    </div>
  );
}

export default function DayBookPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DayBookComponent />
        </Suspense>
    )
}
