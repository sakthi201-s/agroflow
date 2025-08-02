
'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { stockData, StockItem } from '@/lib/data';
import { CreateStockItemForm } from './components/create-stock-item-form';

const columns = [
  { header: 'Product ID', accessorKey: 'id' as keyof StockItem },
  { header: 'Product Name', accessorKey: 'productName' as keyof StockItem },
  { header: 'Type', accessorKey: 'type' as keyof StockItem },
  { header: 'Quantity', accessorKey: 'quantity' as keyof StockItem },
  { header: 'Unit', accessorKey: 'unit' as keyof StockItem },
  { header: 'Location', accessorKey: 'location' as keyof StockItem },
];

function StockComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const company = searchParams.get('company') || 'Company 1';
  const activeCompany = company as 'Company 1' | 'Company 2';

  const [currentStockData, setCurrentStockData] = useState<StockItem[]>(stockData);
  const [isCreateStockOpen, setCreateStockOpen] = useState(false);
  
  const handleCompanyChange = (company: string) => {
    router.push(`/stock?company=${company}`);
  };

  const handleStockItemCreated = (newStockItem: StockItem) => {
    setCurrentStockData(prev => [...prev, newStockItem]);
  };

  const filteredData = currentStockData.filter(item => item.company === activeCompany);

  return (
    <>
    <CreateStockItemForm
        isOpen={isCreateStockOpen}
        onOpenChange={setCreateStockOpen}
        onStockItemCreated={handleStockItemCreated}
        activeCompany={activeCompany}
    />
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Stock Management</h1>
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
            <Button onClick={() => setCreateStockOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Stock
            </Button>
        </div>
      </div>
      <DataTable columns={columns} data={filteredData} tableName="Stock"/>
    </div>
    </>
  );
}


export default function StockPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <StockComponent />
        </Suspense>
    )
}
