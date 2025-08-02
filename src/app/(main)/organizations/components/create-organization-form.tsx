
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
import { Organization } from '@/lib/data';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  name: z.string().min(2, 'Organization name must be at least 2 characters.'),
  contactPerson: z.string().min(2, 'Contact person name must be at least 2 characters.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  email: z.string().email('Please enter a valid email address.'),
  productTypes: z.string().min(3, 'Please specify product types.'),
});

type CreateOrganizationFormProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onOrganizationCreated: (newOrganization: Organization) => void;
};

export function CreateOrganizationForm({ isOpen, onOpenChange, onOrganizationCreated }: CreateOrganizationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newOrganization: Organization = {
      id: `ORG-${Date.now().toString().slice(-4)}`,
      ...values,
    };
    
    onOrganizationCreated(newOrganization);
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Organization</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new organization.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Agri Supplies Co." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Mark Johnson" {...field} />
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
                    <Input placeholder="e.g., 555-0201" {...field} />
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
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., sales@agrisupplies.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productTypes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Types</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Fertilizer, Seeds, Maize" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Add Organization</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
