
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
import { Customer } from '@/lib/data';
import { format } from 'date-fns';

const formSchema = z.object({
  name: z.string().min(2, 'Customer name must be at least 2 characters.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  email: z.string().email('Please enter a valid email address.').or(z.literal('')).optional(),
  address: z.string().min(5, 'Please enter a valid address.'),
});

type CreateCustomerFormProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCustomerCreated: (newCustomer: Customer) => void;
};

export function CreateCustomerForm({ isOpen, onOpenChange, onCustomerCreated }: CreateCustomerFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newCustomer: Customer = {
      id: `CUS-${Date.now().toString().slice(-4)}`,
      lastPurchaseDate: format(new Date(), 'yyyy-MM-dd'),
      name: values.name,
      phone: values.phone,
      email: values.email ?? '',
      address: values.address,
    };
    
    onCustomerCreated(newCustomer);
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new customer.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., John Doe Farms" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 555-0101" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 123 Farm Rd, Rural Town" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Add Customer</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
