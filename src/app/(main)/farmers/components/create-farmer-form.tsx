
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
import { Farmer } from '@/lib/data';

const formSchema = z.object({
  name: z.string().min(2, 'Farmer name must be at least 2 characters.'),
  location: z.string().min(2, 'Location is required.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
});

type CreateFarmerFormProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onFarmerCreated: (newFarmer: Farmer) => void;
};

export function CreateFarmerForm({ isOpen, onOpenChange, onFarmerCreated }: CreateFarmerFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      location: '',
      phone: '',
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newFarmer: Farmer = {
      id: `FARM-${Date.now().toString().slice(-4)}`,
      name: values.name,
      location: values.location,
      phone: values.phone,
    };
    
    onFarmerCreated(newFarmer);
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Farmer</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new farmer.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Farmer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Samuel Miller" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., West Valley" {...field} />
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
                    <Input placeholder="e.g., 555-0301" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Add Farmer</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
