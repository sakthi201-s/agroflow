
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { customerData, farmerData, organizationData, stockData, Bill, Transaction } from '@/lib/data';

const formSchema = z.object({
  billType: z.enum(['Receivable', 'Payable']),
  counterpartyType: z.enum(['Customer', 'Farmer', 'Organization']),
  counterparty: z.string().min(1, 'Please select a counterparty.'),
  productName: z.string().min(1, 'Please select a product.'),
  quantity: z.coerce.number().min(1, 'Quantity must be at least 1.'),
  amount: z.coerce.number().min(0.01, 'Amount must be greater than 0.'),
  dueDate: z.date(),
});

type CreateBillFormProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onBillCreated: (newBill: Bill, newTransaction: Transaction) => void;
  activeCompany: 'Company 1' | 'Company 2';
};

export function CreateBillForm({ isOpen, onOpenChange, onBillCreated, activeCompany }: CreateBillFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      billType: 'Receivable',
      quantity: 1,
    },
  });

  const counterpartyType = form.watch('counterpartyType');

  const getCounterpartyOptions = () => {
    switch (counterpartyType) {
      case 'Customer':
        return customerData;
      case 'Farmer':
        return farmerData;
      case 'Organization':
        return organizationData;
      default:
        return [];
    }
  };

  const getProductOptions = () => {
      if (activeCompany === 'Company 1') {
          return stockData.filter(p => p.type === 'Fertilizer' || p.type === 'Seeds');
      }
      return stockData.filter(p => p.type === 'Maize');
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    const counterpartyName = getCounterpartyOptions().find(c => c.id === values.counterparty)?.name || 'Unknown';
    const product = getProductOptions().find(p => p.productName === values.productName);

    const newBill: Bill = {
        invoiceId: `BILL-${Date.now().toString().slice(-4)}`,
        customer: counterpartyName,
        counterpartyType: values.counterpartyType,
        billType: values.billType,
        company: activeCompany,
        amount: `$${values.amount.toFixed(2)}`,
        dueDate: format(values.dueDate, 'yyyy-MM-dd'),
        status: 'Pending',
    };

    const newTransaction: Transaction = {
        id: `TRN-${Date.now().toString().slice(-4)}`,
        date: format(new Date(), 'yyyy-MM-dd'),
        type: values.billType === 'Receivable' ? 'Sale' : 'Purchase',
        company: activeCompany,
        counterparty: counterpartyName,
        counterpartyType: values.counterpartyType,
        productName: values.productName,
        quantity: values.quantity,
        unit: product?.unit || 'bags',
        amount: `$${values.amount.toFixed(2)}`,
    }
    
    onBillCreated(newBill, newTransaction);
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Bill</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new bill. A corresponding transaction will be automatically recorded.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="billType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bill Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select bill type" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Receivable">Receivable (Invoice)</SelectItem>
                      <SelectItem value="Payable">Payable (Bill)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
                control={form.control}
                name="counterpartyType"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Counterparty Type</FormLabel>
                    <Select onValueChange={(value) => {
                        field.onChange(value);
                        form.setValue('counterparty', ''); // Reset counterparty when type changes
                    }} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select counterparty type" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {activeCompany === 'Company 1' && <SelectItem value="Customer">Customer</SelectItem>}
                        {activeCompany === 'Company 2' && <SelectItem value="Farmer">Farmer</SelectItem>}
                        <SelectItem value="Organization">Organization</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
            />

            {counterpartyType && (
              <FormField
                control={form.control}
                name="counterparty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Counterparty</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder={`Select a ${counterpartyType}`} /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {getCounterpartyOptions().map(option => (
                          <SelectItem key={option.id} value={option.id}>{option.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a product" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {getProductOptions().map(option => (
                          <SelectItem key={option.id} value={option.productName}>{option.productName}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Amount ($)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date('1900-01-01')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Create Bill</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
