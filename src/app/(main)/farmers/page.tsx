import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Tractor, Phone, MapPin, Wheat, History } from 'lucide-react';

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
              <Button variant="outline" className="w-full">
                <History className="mr-2 h-4 w-4" />
                View Ledger
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
