
'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type StockItem = {
  id: string;
  productName: string;
  type: 'Fertilizer' | 'Seeds' | 'Maize';
  company: 'Company 1' | 'Company 2';
  quantity: number;
  unit: 'kg' | 'ton' | 'bags';
  location: string;
};

const stockData: StockItem[] = [
  { id: 'STK001', productName: 'Urea Fertilizer', type: 'Fertilizer', company: 'Company 1', quantity: 500, unit: 'bags', location: 'Warehouse A' },
  { id: 'STK002', productName: 'Hybrid Maize Seeds', type: 'Seeds', company: 'Company 1', quantity: 200, unit: 'bags', location: 'Warehouse B' },
  { id: 'STK003', productName: 'Imported Yellow Maize', type: 'Maize', company: 'Company 2', quantity: 150, unit: 'ton', location: 'Silo 3' },
  { id: 'STK004', productName: 'DAP Fertilizer', type: 'Fertilizer', company: 'Company 1', quantity: 300, unit: 'bags', location: 'Warehouse A' },
  { id: 'STK005', productName: 'Sorghum Seeds', type: 'Seeds', company: 'Company 1', quantity: 150, unit: 'bags', location: 'Warehouse B' },
  { id: 'STK006', productName: 'Local White Maize', type: 'Maize', company: 'Company 2', quantity: 250, unit: 'ton', location: 'Silo 1' },
];

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
  
  const handleCompanyChange = (company: string) => {
    router.push(`/stock?company=${company}`);
  };

  const filteredData = stockData.filter(item => item.company === activeCompany);

  return (
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
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Stock
            </Button>
        </div>
      </div>
      <DataTable columns={columns} data={filteredData} tableName="Stock"/>
    </div>
  );
}


export default function StockPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <StockComponent />
        </Suspense>
    )
}
