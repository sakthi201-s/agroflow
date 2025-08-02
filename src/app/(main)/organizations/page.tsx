import {Button} from '@/components/ui/button';
import {PlusCircle} from 'lucide-react';
import {DataTable} from '@/components/data-table';

type Organization = {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  productTypes: string;
};

const organizationData: Organization[] = [
  { id: 'ORG001', name: 'Agri Supplies Co.', contactPerson: 'Mark Johnson', phone: '555-0201', email: 'sales@agrisupplies.com', productTypes: 'Fertilizer, Seeds' },
  { id: 'ORG002', name: 'Crop Growth Solutions', contactPerson: 'Susan Lee', phone: '555-0202', email: 'susan.lee@cgs.com', productTypes: 'Fertilizer' },
  { id: 'ORG003', name: 'Heritage Seeds Ltd.', contactPerson: 'David Chen', phone: '555-0203', email: 'david.chen@heritageseeds.com', productTypes: 'Seeds' },
  { id: 'ORG004', name: 'Farm Essentials Inc.', contactPerson: 'Maria Garcia', phone: '555-0204', email: 'maria.g@farmessentials.com', productTypes: 'Fertilizer, Tools' },
];

const columns = [
  { header: 'Org ID', accessorKey: 'id' as keyof Organization },
  { header: 'Name', accessorKey: 'name' as keyof Organization },
  { header: 'Contact Person', accessorKey: 'contactPerson' as keyof Organization },
  { header: 'Phone', accessorKey: 'phone' as keyof Organization },
  { header: 'Email', accessorKey: 'email' as keyof Organization },
  { header: 'Products', accessorKey: 'productTypes' as keyof Organization },
];

export default function OrganizationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Organization Management (Suppliers)</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Organization
        </Button>
      </div>
      <DataTable columns={columns} data={organizationData} tableName="Organizations"/>
    </div>
  );
}
