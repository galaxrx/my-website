'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '../cn'; // Corrected Path
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { CheckCircle, AlertTriangle, Loader } from 'lucide-react';
import AnalyzingPulse from './AnalyzingPulse';

// Define the form validation schema with Zod
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  role: z.string().optional(),
  pharmacy: z.string().min(2, { message: 'Pharmacy name is required.' }),
  country: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  wantsDemo: z.boolean().default(false),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setFormStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      setFormStatus('success');
      reset();
    } catch (error: any) {
      setFormStatus('error');
      setErrorMessage(error.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {formStatus === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-lg h-full min-h-[400px]"
          >
            <CheckCircle className="w-16 h-16 text-accent-2 mb-4" />
            <h3 className="text-2xl font-heading font-semibold mb-2">Message Sent!</h3>
            <p className="text-muted-foreground">Thank you for reaching out. We'll get back to you shortly.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" {...register('name')} placeholder="Jane Doe" className="bg-background" />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Your Role</Label>
                <Input id="role" {...register('role')} placeholder="Pharmacist, Owner, etc." className="bg-background" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" {...register('email')} placeholder="you@yourpharmacy.com" className="bg-background" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                <Label htmlFor="pharmacy">Pharmacy / Group Name</Label>
                <Input id="pharmacy" {...register('pharmacy')} placeholder="Your Pharmacy Name" className="bg-background" />
                {errors.pharmacy && <p className="text-red-500 text-sm">{errors.pharmacy.message}</p>}
              </div>
               <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" {...register('country')} placeholder="e.g., Australia" className="bg-background" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" {...register('message')} placeholder="Tell us about your needs..." className="bg-background min-h-[120px]" />
              {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox id="wantsDemo" {...register('wantsDemo')} />
                <label htmlFor="wantsDemo" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I'd like a guided demo of GALAXRX
                </label>
            </div>
            <div className="flex flex-col items-start">
              <Button type="submit" disabled={formStatus === 'submitting'} className="w-full md:w-auto">
                {formStatus === 'submitting' ? (
                  <div className='flex items-center'>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </div>
                ) : 'Send Message'}
              </Button>
              {formStatus === 'error' && (
                <div className="text-red-500 text-sm mt-4 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    {errorMessage}
                </div>
              )}
            </div>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}