'use client';

import {useState} from 'react';
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip} from 'recharts';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {DollarSign, FileText, Warehouse} from 'lucide-react';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { cn } from '@/lib/utils';

const company1Data = {
  profitability: 120500,
  stockValue: 75000,
  upcomingBillings: 15,
  chartData: [
    {month: 'Jan', profit: 12000, loss: 3000},
    {month: 'Feb', profit: 18000, loss: 5000},
    {month: 'Mar', profit: 22000, loss: 4000},
    {month: 'Apr', profit: 25000, loss: 7000},
    {month: 'May', profit: 31000, loss: 6000},
    {month: 'Jun', profit: 28000, loss: 5500},
  ],
};

const company2Data = {
  profitability: 250000,
  stockValue: 180000,
  upcomingBillings: 8,
  chartData: [
    {month: 'Jan', profit: 35000, loss: 8000},
    {month: 'Feb', profit: 42000, loss: 10000},
    {month: 'Mar', profit: 50000, loss: 12000},
    {month: 'Apr', profit: 48000, loss: 9000},
    {month: 'May', profit: 55000, loss: 11000},
    {month: 'Jun', profit: 60000, loss: 13000},
  ],
};

const chartConfig = {
  profit: {
    label: "Profit",
    color: "hsl(var(--chart-1))",
  },
  loss: {
    label: "Loss",
    color: "hsl(var(--chart-2))",
  },
} satisfies import("@/components/ui/chart").ChartConfig;

export default function DashboardPage() {
  const [activeCompany, setActiveCompany] = useState('company1');
  const data = activeCompany === 'company1' ? company1Data : company2Data;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Executive Dashboard</h1>
        <Tabs
          defaultValue="company1"
          onValueChange={setActiveCompany}
          className="transition-all duration-300"
        >
          <TabsList>
            <TabsTrigger value="company1">Fertilizer & Seeds</TabsTrigger>
            <TabsTrigger value="company2">Maize Import/Export</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className={cn("grid gap-4 md:grid-cols-3 transition-opacity duration-500", !data && "opacity-0")}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profitability</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.profitability.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Stock Value</CardTitle>
            <Warehouse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.stockValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all products</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Billings</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.upcomingBillings}</div>
            <p className="text-xs text-muted-foreground">In the next 30 days</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle>Company Performance (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.chartData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    tickFormatter={(value) => `$${Number(value) / 1000}k`}
                />
                <Tooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="profit" fill="var(--color-profit)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="loss" fill="var(--color-loss)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
