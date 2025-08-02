
'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { DataTable } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { initialTransactionData, Transaction } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const columns = (onViewDetails: (transaction: Transaction) => void) => [
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
  {
    header: 'Total Amount',
    accessorKey: 'totalAmount' as keyof Transaction,
    cell: ({ getValue }: { getValue: () => number }) => (
      <span className="font-medium">${getValue().toFixed(2)}</span>
    ),
  },
  {
    header: 'Actions',
    cell: ({ row }: { row: { original: Transaction } }) => (
      <Button variant="ghost" size="icon" onClick={() => onViewDetails(row.original)}>
        <Eye className="h-4 w-4" />
      </Button>
    ),
  },
];

function TransactionsComponent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const company = searchParams.get('company') || 'Company 1';
    const activeCompany = company as 'Company 1' | 'Company 2';
    
    const [transactionData] = useState<Transaction[]>(initialTransactionData);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    
    const handleCompanyChange = (company: string) => {
        router.push(`/transactions?company=${company}`);
    };

    const handleViewDetails = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
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
            <DataTable columns={columns(handleViewDetails)} data={filteredData} tableName="Transactions" />

            <Dialog open={!!selectedTransaction} onOpenChange={(isOpen) => !isOpen && setSelectedTransaction(null)}>
                <DialogContent className="max-w-2xl">
                    {selectedTransaction && (
                       <>
                           <DialogHeader>
                              <DialogTitle>Transaction Details: {selectedTransaction.id}</DialogTitle>
                              <DialogDescription>
                                  Date: {selectedTransaction.date} | Party: {selectedTransaction.counterparty}
                              </DialogDescription>
                          </DialogHeader>
                          <div className="mt-4 space-y-4">
                              <div className="grid grid-cols-4 font-semibold border-b pb-2">
                                  <div>Product</div>
                                  <div className="text-right">Quantity</div>
                                  <div className="text-right">Price/Unit</div>
                                  <div className="text-right">Total</div>
                              </div>
                              {selectedTransaction.items.map((item, index) => (
                                  <div key={index} className="grid grid-cols-4 items-center">
                                      <div>
                                          <p className="font-medium">{item.productName}</p>
                                          <p className="text-xs text-muted-foreground">{item.unit}</p>
                                      </div>
                                      <div className="text-right">{item.quantity}</div>
                                      <div className="text-right">${item.price.toFixed(2)}</div>
                                      <div className="text-right font-medium">${(item.quantity * item.price).toFixed(2)}</div>
                                  </div>
                              ))}
                               <div className="grid grid-cols-4 font-bold border-t pt-2 mt-4">
                                  <div className="col-span-3 text-right">Grand Total</div>
                                  <div className="text-right">${selectedTransaction.totalAmount.toFixed(2)}</div>
                              </div>
                          </div>
                       </>
                    )}
                </DialogContent>
            </Dialog>
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
