
'use client';

import { useParams, useRouter } from 'next/navigation';
import { DataTable } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { transactionData, Transaction } from '@/app/(main)/transactions/page';
import { customerData } from '@/app/(main)/customers/page';
import { farmerData } from '@/app/(main)/farmers/page';
import { organizationData } from '@/app/(main)/organizations/page';

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

export default function LedgerPage() {
  const router = useRouter();
  const params = useParams();
  const { partyType, partyId } = params;

  const getPartyName = () => {
    let party;
    if (partyType === 'customer') {
      party = customerData.find(c => c.id === partyId);
    } else if (partyType === 'farmer') {
      party = farmerData.find(f => f.id === partyId);
    } else if (partyType === 'organization') {
      party = organizationData.find(o => o.id === partyId);
    }
    return party?.name || 'Unknown';
  };
  
  const partyName = getPartyName();

  const filteredTransactions = transactionData.filter(
    (t) => t.counterparty === partyName
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
            <h1 className="text-2xl font-bold">Ledger: {partyName}</h1>
            <p className="text-muted-foreground">
                Showing all transactions for this party.
            </p>
        </div>
      </div>
      <DataTable columns={columns} data={filteredTransactions} tableName={`${partyName}_ledger`} />
    </div>
  );
}
