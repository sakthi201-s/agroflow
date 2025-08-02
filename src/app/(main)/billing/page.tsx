
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal, Filter, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { CreateBillForm } from './components/create-bill-form';
import { initialBillingData, initialTransactionData, Bill, Transaction } from '@/lib/data';

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
        setBillingData(prev => [...prev, newBill]);
        setTransactionData(prev => [...prev, newTransaction]);
    };

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
        accessorKey: 'invoiceId' as keyof Bill,
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
