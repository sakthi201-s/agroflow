
'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal, Filter, ArrowUpCircle, ArrowDownCircle, Printer } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { CreateBillForm } from './components/create-bill-form';
import { initialBillingData, initialTransactionData, Bill, Transaction } from '@/lib/data';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

type FilterType = 'All' | 'Customer' | 'Organization' | 'Farmer';

function BillingComponent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const company = searchParams.get('company') || 'Company 1';
    const activeCompany = company as 'Company 1' | 'Company 2';

    const [activeFilter, setActiveFilter] = useState<FilterType>('All');
    const [billingData, setBillingData] = useState<Bill[]>(initialBillingData);
    const [transactionData, setTransactionData] = useState<Transaction[]>(initialTransactionData);
    const [isCreateBillOpen, setCreateBillOpen] = useState(false);
    const [lastCreatedBill, setLastCreatedBill] = useState<Bill | null>(null);

    const handlePrint = (billToPrint: Bill | null) => {
        if (!billToPrint) return;

        const printWindow = window.open('', '', 'height=600,width=800');
        if (printWindow) {
            const billItemsHtml = billToPrint.items.map(item => `
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 8px;">
                        <p style="font-weight: 500; margin: 0;">${item.productName}</p>
                        <p style="font-size: 12px; color: #666; margin: 0;">${item.unit}</p>
                    </td>
                    <td style="padding: 8px; text-align: right;">${item.quantity}</td>
                    <td style="padding: 8px; text-align: right;">$${item.price.toFixed(2)}</td>
                    <td style="padding: 8px; text-align: right; font-weight: 500;">$${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
            `).join('');

            printWindow.document.write(`
                <html>
                    <head>
                        <title>Invoice - ${billToPrint.invoiceId}</title>
                        <style>
                            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #333; }
                            .container { width: 100%; max-width: 800px; margin: 0 auto; padding: 20px; }
                            .header { margin-bottom: 20px; }
                            .header h2 { margin: 0; font-size: 24px; }
                            .header p { margin: 0; color: #666; }
                            table { width: 100%; border-collapse: collapse; }
                            th { text-align: left; padding: 8px; border-bottom: 2px solid #333; }
                            .total-row { font-weight: bold; border-top: 2px solid #333; }
                            .total-row td { padding: 8px; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h2>Invoice: ${billToPrint.invoiceId}</h2>
                                <p>Date: ${new Date().toLocaleDateString()} | Due: ${billToPrint.dueDate}</p>
                                <p>Bill To: ${billToPrint.customer}</p>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th style="text-align: right;">Quantity</th>
                                        <th style="text-align: right;">Price/Unit</th>
                                        <th style="text-align: right;">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${billItemsHtml}
                                </tbody>
                                <tfoot>
                                    <tr class="total-row">
                                        <td colspan="3" style="text-align: right;">Grand Total</td>
                                        <td style="text-align: right;">$${billToPrint.totalAmount.toFixed(2)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        }
    };
    
    useEffect(() => {
        setActiveFilter('All');
    }, [activeCompany]);
    
    const handleCompanyChange = (company: string) => {
        router.push(`/billing?company=${company}`);
    };

    const handleStatusChange = (invoiceId: string, status: Bill['status']) => {
        setBillingData(billingData.map(bill => 
            bill.invoiceId === invoiceId ? { ...bill, status } : bill
        ));
    };

    const handleBillCreated = (newBill: Bill, newTransaction: Transaction) => {
        // Don't add to list yet, wait for user to set status
        setLastCreatedBill(newBill);
        // We still create the transaction immediately
        setTransactionData(prev => [...prev, newTransaction]);
        setCreateBillOpen(false); // Close the form dialog
    };

    const finalizeBill = (status: 'Paid' | 'Pending') => {
        if (!lastCreatedBill) return;
        
        const finalBill = { ...lastCreatedBill, status };
        setBillingData(prev => [...prev, finalBill]);

        if (status === 'Paid') {
            // Potentially update transaction status or create payment record here in a real app
        }
        
        setLastCreatedBill(null); // Close the confirmation dialog
    }

    const columns = [
      { header: 'ID', accessorKey: 'invoiceId' as keyof Bill },
      { 
        header: 'Bill Type', 
        accessorKey: 'billType' as keyof Bill,
        cell: ({ getValue }: { getValue: () => Bill['billType'] }) => {
          const type = getValue();
          const isReceivable = type === 'Receivable';
          const className = isReceivable ? 'bg-blue-500/20 text-blue-700' : 'bg-orange-500/20 text-orange-700';
          const Icon = isReceivable ? ArrowDownCircle : ArrowUpCircle;
          return (
            <Badge variant="outline" className={className}>
              <Icon className="mr-1 h-3 w-3" />
              {type}
            </Badge>
          );
        }
      },
      { header: 'Counterparty', accessorKey: 'customer' as keyof Bill },
      { 
        header: 'Type', 
        accessorKey: 'counterpartyType' as keyof Bill,
        cell: ({ getValue }: { getValue: () => Bill['counterpartyType'] }) => {
          const type = getValue();
          return <Badge variant="outline">{type}</Badge>;
        }
      },
      { 
        header: 'Amount', 
        accessorKey: 'totalAmount' as keyof Bill,
        cell: ({ getValue }: { getValue: () => number }) => `$${getValue().toFixed(2)}`
      },
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
        id: 'actions',
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
                <DropdownMenuItem onClick={() => handlePrint(bill)}>
                    <Printer className="mr-2 h-4 w-4"/> Print Bill
                </DropdownMenuItem>
                <DropdownMenuSeparator />
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
    
    const filteredData = billingData
        .filter(item => item.company === activeCompany)
        .filter(item => activeFilter === 'All' || item.counterpartyType === activeFilter);

  return (
    <>
    <CreateBillForm 
        isOpen={isCreateBillOpen} 
        onOpenChange={setCreateBillOpen}
        onBillCreated={handleBillCreated}
        activeCompany={activeCompany}
    />

    <Dialog open={!!lastCreatedBill} onOpenChange={() => setLastCreatedBill(null)}>
        <DialogContent className="max-w-2xl">
            {lastCreatedBill && (
                <>
                <div className="p-4">
                    <DialogHeader>
                        <DialogTitle>Bill Created Successfully!</DialogTitle>
                        <DialogDescription>
                            What would you like to do next?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 border rounded-lg p-4">
                        <h3 className="font-semibold text-lg">{lastCreatedBill.invoiceId}</h3>
                        <p>To: {lastCreatedBill.customer}</p>
                        <p>Amount: ${lastCreatedBill.totalAmount.toFixed(2)}</p>
                        <p>Due: {lastCreatedBill.dueDate}</p>
                    </div>
                </div>
                <DialogFooter className="flex-col sm:flex-row gap-2 p-4">
                    <Button variant="outline" onClick={() => handlePrint(lastCreatedBill)}><Printer className="mr-2 h-4 w-4"/> Print</Button>
                    <div className="flex-grow" />
                    <Button variant="secondary" onClick={() => finalizeBill('Pending')}>Leave as Pending</Button>
                    <Button onClick={() => finalizeBill('Paid')}>Mark as Paid</Button>
                </DialogFooter>
                </>
            )}
        </DialogContent>
    </Dialog>


    <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">Billing System</h1>
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
                <Button onClick={() => setCreateBillOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Create Bill
                </Button>
            </div>
        </div>

        <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Tabs
                value={activeFilter}
                onValueChange={(value) => setActiveFilter(value as FilterType)}
            >
                <TabsList>
                    <TabsTrigger value="All">All</TabsTrigger>
                    {activeCompany === 'Company 1' ? (
                        <>
                            <TabsTrigger value="Customer">Customers</TabsTrigger>
                            <TabsTrigger value="Organization">Organizations</TabsTrigger>
                        </>
                    ) : (
                        <>
                            <TabsTrigger value="Farmer">Farmers</TabsTrigger>
                            <TabsTrigger value="Organization">Organizations</TabsTrigger>
                        </>
                    )}
                </TabsList>
            </Tabs>
        </div>
      <DataTable columns={columns} data={filteredData} tableName="Billing"/>
    </div>
    </>
  );
}

export default function BillingPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BillingComponent />
        </Suspense>
    )
}
