
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Tractor, Phone, MapPin, Wheat, History } from 'lucide-react';
import Link from 'next/link';
import { farmerData } from '@/lib/data';

export default function FarmersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Farmer Management (Suppliers)</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Farmer
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {farmerData.map((farmer) => (
          <Card key={farmer.id}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Tractor className="h-5 w-5 text-muted-foreground" />
                    {farmer.name}
                </CardTitle>
                <CardDescription>ID: {farmer.id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{farmer.location}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{farmer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Wheat className="h-4 w-4 text-muted-foreground" />
                    <span>{farmer.cropType} ({farmer.acreage} acres)</span>
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild variant="outline" className="w-full">
                    <Link href={`/ledger/farmer/${farmer.id}`}>
                        <History className="mr-2 h-4 w-4" />
                        View Ledger
                    </Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
