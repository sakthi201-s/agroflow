
'use client';

import { useParams, useRouter } from 'next/navigation';
import { DataTable } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { initialTransactionData, Transaction, customerData, farmerData, organizationData } from '@/lib/data';
import { useLocalStorage } from '@/hooks/use-local-storage';

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
  {
    header: 'Total Amount',
    accessorKey: 'totalAmount' as keyof Transaction,
    cell: ({ getValue }: { getValue: () => number }) => (
      <span className="font-medium">${getValue().toFixed(2)}</span>
    ),
  },
];

export default function LedgerPage() {
  const router = useRouter();
  const params = useParams();
  const { partyType, partyId } = params;

  const [transactions] = useLocalStorage<Transaction[]>('transactionData', initialTransactionData);
  const [customers] = useLocalStorage<typeof customerData>('customerData', customerData);
  const [farmers] = useLocalStorage<typeof farmerData>('farmerData', farmerData);
  const [organizations] = useLocalStorage<typeof organizationData>('organizationData', organizationData);

  const getPartyName = () => {
    let party;
    if (partyType === 'customer') {
      party = customers.find(c => c.id === partyId);
    } else if (partyType === 'farmer') {
      party = farmers.find(f => f.id === partyId);
    } else if (partyType === 'organization') {
      party = organizations.find(o => o.id === partyId);
    }
    return party?.name || 'Unknown';
  };
  
  const partyName = getPartyName();

  const filteredTransactions = transactions.filter(
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
