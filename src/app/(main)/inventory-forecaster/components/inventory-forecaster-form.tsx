'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {inventoryForecaster, InventoryForecasterOutput} from '@/ai/flows/inventory-forecaster';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';
import {useToast} from '@/hooks/use-toast';
import { Loader2, Lightbulb, Bell, CheckCircle } from 'lucide-react';

const formSchema = z.object({
  productType: z.enum(['fertilizer', 'seeds', 'maize'], {
    required_error: 'Please select a product type.',
  }),
  companyName: z.enum(['Company 1', 'Company 2'], {
    required_error: 'Please select a company.',
  }),
  historicalData: z.string().min(10, {
    message: 'Please provide some historical sales data.',
  }),
  seasonalDemand: z.string().min(10, {
    message: 'Please describe the expected seasonal demand.',
  }),
});

export function InventoryForecasterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<InventoryForecasterOutput | null>(null);
  const {toast} = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      historicalData: 'Month,Sales\nJan,100\nFeb,120\nMar,150\nApr,130\nMay,180\nJun,200',
      seasonalDemand: 'Peak demand expected during the planting season from March to May. Lower demand in winter months.',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const forecastResult = await inventoryForecaster(values);
      setResult(forecastResult);
    } catch (error) {
      console.error('Forecast failed:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate forecast. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Forecasting Parameters</CardTitle>
              <CardDescription>
                Fill in the details below to generate an inventory forecast.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="productType"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Product Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a product type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="fertilizer">Fertilizer</SelectItem>
                        <SelectItem value="seeds">Seeds</SelectItem>
                        <SelectItem value="maize">Maize</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyName"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a company" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Company 1">Company 1 (Fertilizer & Seeds)</SelectItem>
                        <SelectItem value="Company 2">Company 2 (Maize Import/Export)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="historicalData"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Historical Sales Data (CSV format)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Month,Sales\nJan,100\nFeb,120"
                        className="h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seasonalDemand"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Seasonal Demand Variations</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Peak demand during planting season..."
                        className="h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Forecast...
                  </>
                ) : (
                  'Generate Forecast'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Forecast Result</CardTitle>
          <CardDescription>
            The AI-powered forecast will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          {isLoading && (
            <div className="flex h-full flex-col items-center justify-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Analyzing data and generating insights...</p>
            </div>
          )}
          {result && !isLoading && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Forecasted Optimal Stock Level</p>
                <p className="text-5xl font-bold text-primary">{result.forecastedStockLevel.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">units</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-lg border bg-secondary/50 p-4">
                  <Lightbulb className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                  <div>
                    <h3 className="font-semibold">Explanation</h3>
                    <p className="text-sm text-muted-foreground">{result.explanation}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border bg-secondary/50 p-4">
                    {result.notificationMessage.toLowerCase().includes('optimal') ? 
                        <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" /> :
                        <Bell className="mt-1 h-5 w-5 flex-shrink-0 text-amber-500" />
                    }
                  <div>
                    <h3 className="font-semibold">Notification</h3>
                    <p className="text-sm text-muted-foreground">{result.notificationMessage}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
           {!result && !isLoading && (
            <div className="flex h-full flex-col items-center justify-center text-center">
                <BrainCircuit className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">Your forecast results will be displayed here.</p>
                <p className="text-sm text-muted-foreground/80">Fill out the form and click "Generate Forecast".</p>
            </div>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
