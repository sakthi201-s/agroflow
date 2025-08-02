
'use client';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
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
import { CalendarIcon, PlusCircle, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { customerData, farmerData, organizationData, stockData, Bill, Transaction, BillItem } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';

const billItemSchema = z.object({
  productName: z.string().min(1, "Product is required."),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1."),
  price: z.coerce.number().min(0.01, "Price is required."),
});

const formSchema = z.object({
  billType: z.enum(['Receivable', 'Payable']),
  counterpartyType: z.enum(['Customer', 'Farmer', 'Organization']),
  counterparty: z.string().min(1, 'Please select a counterparty.'),
  dueDate: z.date(),
  items: z.array(billItemSchema).min(1, "Please add at least one item."),
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
      items: [{ productName: '', quantity: 1, price: 0 }],
      dueDate: new Date(),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items"
  });

  const counterpartyType = form.watch('counterpartyType');
  const items = form.watch('items');

  const getCounterpartyOptions = () => {
    switch (counterpartyType) {
      case 'Customer': return customerData;
      case 'Farmer': return farmerData;
      case 'Organization': return organizationData;
      default: return [];
    }
  };

  const getProductOptions = () => {
      if (activeCompany === 'Company 1') {
          return stockData.filter(p => p.type === 'Fertilizer' || p.type === 'Seeds');
      }
      return stockData.filter(p => p.type === 'Maize');
  }

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const counterpartyName = getCounterpartyOptions().find(c => c.id === values.counterparty)?.name || 'Unknown';
    const totalAmount = calculateTotal();
    
    const billItems: BillItem[] = values.items.map(item => {
        const product = getProductOptions().find(p => p.productName === item.productName);
        return {
            ...item,
            id: product?.id || `PROD-${Date.now()}`,
            unit: product?.unit || 'bags'
        }
    });

    const newBill: Bill = {
        invoiceId: `BILL-${Date.now().toString().slice(-4)}`,
        customer: counterpartyName,
        counterpartyType: values.counterpartyType,
        billType: values.billType,
        company: activeCompany,
        totalAmount: totalAmount,
        dueDate: format(values.dueDate, 'yyyy-MM-dd'),
        status: 'Pending',
        items: billItems,
    };

    const newTransaction: Transaction = {
        id: `TRN-${Date.now().toString().slice(-4)}`,
        date: format(new Date(), 'yyyy-MM-dd'),
        type: values.billType === 'Receivable' ? 'Sale' : 'Purchase',
        company: activeCompany,
        counterparty: counterpartyName,
        counterpartyType: values.counterpartyType,
        totalAmount: totalAmount,
        items: billItems,
    }
    
    onBillCreated(newBill, newTransaction);
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create New Bill</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new bill. A corresponding transaction will be automatically recorded.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ScrollArea className="h-[60vh] p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Due Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn('w-full pl-3 text-left font-normal',!field.value && 'text-muted-foreground')}
                              >
                                {field.value ? (format(field.value, 'PPP')) : (<span>Pick a date</span>)}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus/>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="counterpartyType"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Counterparty Type</FormLabel>
                        <Select onValueChange={(value) => {
                            field.onChange(value);
                            form.setValue('counterparty', '');
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
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Items</h3>
                    {fields.map((field, index) => (
                      <div key={field.id} className="grid grid-cols-12 gap-2 items-end p-3 border rounded-md">
                          <div className="col-span-12 md:col-span-5">
                             <FormField
                                control={form.control}
                                name={`items.${index}.productName`}
                                render={({ field }) => (
                                <FormItem>
                                    {index === 0 && <FormLabel>Product</FormLabel>}
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger><SelectValue placeholder="Select product" /></SelectTrigger>
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
                          </div>
                          <div className="col-span-6 md:col-span-2">
                             <FormField
                              control={form.control}
                              name={`items.${index}.quantity`}
                              render={({ field }) => (
                                <FormItem>
                                   {index === 0 && <FormLabel>Quantity</FormLabel>}
                                  <FormControl><Input type="number" placeholder="Qty" {...field} /></FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                           <div className="col-span-6 md:col-span-2">
                             <FormField
                              control={form.control}
                              name={`items.${index}.price`}
                              render={({ field }) => (
                                <FormItem>
                                  {index === 0 && <FormLabel>Price/Unit</FormLabel>}
                                  <FormControl><Input type="number" placeholder="Price" {...field} /></FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="col-span-10 md:col-span-2">
                                {index === 0 && <FormLabel>Total</FormLabel>}
                                <p className="font-medium p-2 text-right">
                                    ${(items[index].quantity * items[index].price).toFixed(2)}
                                </p>
                          </div>
                          <div className="col-span-2 md:col-span-1">
                            <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                      </div>
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => append({ productName: '', quantity: 1, price: 0 })}
                    >
                        <PlusCircle className="mr-2 h-4 w-4"/> Add Item
                    </Button>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="mt-4 p-4 border-t">
                <div className="flex-1 text-right text-lg font-bold">
                    Grand Total: ${calculateTotal().toFixed(2)}
                </div>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Create Bill</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

    