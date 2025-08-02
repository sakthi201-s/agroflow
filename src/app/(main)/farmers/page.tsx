import {Button} from '@/components/ui/button';
import {PlusCircle} from 'lucide-react';
import {DataTable} from '@/components/data-table';

type Farmer = {
  id: string;
  name: string;
  location: string;
  phone: string;
  cropType: string;
  acreage: number;
};

const farmerData: Farmer[] = [
  { id: 'FARM001', name: 'Samuel Miller', location: 'West Valley', phone: '555-0301', cropType: 'Yellow Maize', acreage: 150 },
  { id: 'FARM002', name: 'Isabella Garcia', location: 'East Ridge', phone: '555-0302', cropType: 'White Maize', acreage: 200 },
  { id: 'FARM003', name: 'William Brown', location: 'North Plains', phone: '555-0303', cropType: 'Yellow Maize', acreage: 120 },
  { id: 'FARM004', name: 'Sophia Nguyen', location: 'South Delta', phone: '555-0304', cropType: 'Mixed Maize', acreage: 300 },
];

const columns = [
  { header: 'Farmer ID', accessorKey: 'id' as keyof Farmer },
  { header: 'Name', accessorKey: 'name' as keyof Farmer },
  { header: 'Location', accessorKey: 'location' as keyof Farmer },
  { header: 'Phone', accessorKey: 'phone' as keyof Farmer },
  { header: 'Crop Type', accessorKey: 'cropType' as keyof Farmer },
  { header: 'Acreage', accessorKey: 'acreage' as keyof Farmer },
];

export default function FarmersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Farmer Management (Suppliers)</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Farmer
        </Button>
      </div>
      <DataTable columns={columns} data={farmerData} tableName="Farmers"/>
    </div>
  );
}
