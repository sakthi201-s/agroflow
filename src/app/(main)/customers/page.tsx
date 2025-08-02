import {Button} from '@/components/ui/button';
import {PlusCircle} from 'lucide-react';
import {DataTable} from '@/components/data-table';

type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  lastPurchaseDate: string;
};

const customerData: Customer[] = [
  { id: 'CUS001', name: 'John Doe Farms', phone: '555-0101', email: 'john.doe@example.com', address: '123 Farm Rd, Rural Town', lastPurchaseDate: '2024-05-15' },
  { id: 'CUS002', name: 'Jane Smith Fields', phone: '555-0102', email: 'jane.smith@example.com', address: '456 Meadow Ln, Greenfield', lastPurchaseDate: '2024-06-01' },
  { id: 'CUS003', name: 'Local Coop', phone: '555-0103', email: 'contact@localcoop.com', address: '789 Market St, Cityville', lastPurchaseDate: '2024-05-28' },
  { id: 'CUS004', name: 'Green Valley Gardens', phone: '555-0104', email: 'info@gvgardens.net', address: '321 Orchard Ave, Fruitdale', lastPurchaseDate: '2024-06-10' },
];

const columns = [
  { header: 'Customer ID', accessorKey: 'id' as keyof Customer },
  { header: 'Name', accessorKey: 'name' as keyof Customer },
  { header: 'Phone', accessorKey: 'phone' as keyof Customer },
  { header: 'Email', accessorKey: 'email' as keyof Customer },
  { header: 'Address', accessorKey: 'address' as keyof Customer },
  { header: 'Last Purchase', accessorKey: 'lastPurchaseDate' as keyof Customer },
];

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Customer Management (Company 1)</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Customer
        </Button>
      </div>
      <DataTable columns={columns} data={customerData} tableName="Customers"/>
    </div>
  );
}
